const SaleService = require('../services/SaleService');

class SaleController {
  static async register(req, res) {
    const { id: userId } = req.user;
    await SaleService.register({ userId, ...req.body });
    return res.status(201).end();
  }

  static async listAllByUserId(req, res) {
    const { id: userId } = req.user;
    const ordersList = await SaleService.listAllByUserId(userId);
    return res.status(200).json(ordersList);
  }
}

module.exports = SaleController;
