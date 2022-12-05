const md5 = require('md5');
const { User } = require('../database/models');
const HttpErrorHandler = require('../middlewares/errorHandler/HttpErrorHandler');
const tokenHelper = require('../helpers/Token');

class UserService {
  static async userAlreadyExists(name, email) {
    const existingName = await User.findOne({
      where: { name },
    });

    if (existingName) {
      throw new HttpErrorHandler(409, 'Name already registered');
    }

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new HttpErrorHandler(409, 'Email already registered');
    }
  }

  static async login({ email, password }) {
    const hashedPassword = md5(password);

    const user = await User.findOne({
      where: { email, password: hashedPassword },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    if (!user) throw new HttpErrorHandler(404, 'Invalid user or password');

    const token = tokenHelper.create(user);

    const { name, role } = user;

    return { name, email, role, token };
  }

  static async register({ name, email, password }) {
    await UserService.userAlreadyExists(name, email);

    const hashedPassword = md5(password);

    const { id, role } = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'customer',
    });

    const token = tokenHelper.create({ id, name, email, role });

    return { name, email, role, token };
  }

  static async getSellerByName(name) {
    const seller = await User.findOne({
      where: { name, role: 'seller' },
    });
    return seller;
  }
}

module.exports = UserService;
