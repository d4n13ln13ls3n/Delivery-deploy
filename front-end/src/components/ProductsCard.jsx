import React from 'react';
import propTypes from 'prop-types';

export default function Products({ price, urlImage, name, id }) {
  return (
    <container>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <img
        className="product-card-img"
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>
      <div>
        <button
          data-testid={
            `customer_products__button-card-rm-item-${id}`
          }
          type="button"
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
          data-testid={
            `customer_products__button-card-add-item-${id}`
          }
          type="button"
        >
          +
        </button>
      </div>
    </container>
  );
}

Products.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  urlImage: propTypes.string.isRequired,
};