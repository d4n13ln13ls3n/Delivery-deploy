/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';

export default function OrderCard() {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('');
  const [userToken, setUserToken] = useState('');
  const genericDTId = '_orders__element-'; // Generic Data Test ID
  const location = useLocation();
  console.log(userType);
  console.log(data);

  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const fetchOrders = async (route) => {
      setUserType(path);
      const response = await getData(`sales/${route}s`, userToken);
      setData(response);
    };
    fetchOrders(path);
  }, [location.pathname, userToken]);

  return (
    <Container className="ordersContainer">
      {data.map((order) => {
        const {
          id,
          saleDate,
          totalPrice,
          status,
          deliveryAddress,
          deliveryNumber,
        } = order;
        return (
          <div key={ id } className="cardContainer">
            <Link to={ `orders/${id}` }>
              <div className="orderNumberContainer">
                <p data-testid={ `${userType}${genericDTId}order-id-${id}` }>
                  {`Pedido ${id}`}
                </p>
              </div>
              <div className="orderDataContainer">
                <div className="orderStatus">
                  <p
                    data-testid={ `${userType}${genericDTId}delivery-status-id-${id}` }
                  >
                    {status}
                  </p>
                </div>
                <div className="orderDateValueContainer">
                  <div className="orderDate">
                    <p
                      data-testid={ `${userType}${genericDTId}order-date-id-${id}` }
                    >
                      {saleDate}
                    </p>
                  </div>
                  <div>
                    <p
                      data-testid={ `${userType}${genericDTId}card-price-id-${id}` }
                      className="orderDate"
                    >
                      {totalPrice.replace('.', ',')}
                    </p>
                  </div>
                </div>
                <div className="costumerAdress">
                  {userType === 'seller' ? (
                    <p>{`${deliveryAddress}, N ${deliveryNumber}`}</p>
                  ) : null}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </Container>
  );
}
