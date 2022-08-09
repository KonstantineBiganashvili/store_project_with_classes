import React from 'react';
import './Product.css';

const Product = (props) => {
  const { allProducts, setBasket, element, changeSelectedAmount } = props;
  const { id, src, name, price, stock, amount } = element;

  let localBasket = JSON.parse(localStorage.getItem('Basket')) || {};

  const setSelected = (id) => {
    allProducts.forEach((oldProduct) => {
      if (oldProduct.id === id) {
        if (!oldProduct.amount) {
          oldProduct.amount = 1;
        }
        setBasket(id, oldProduct.amount);
      }
    });
  };

  return (
    <div className="main-container">
      <div
        className={
          localBasket.hasOwnProperty(id)
            ? 'selected-product-box'
            : 'unselected-product-box'
        }
      >
        <img
          src={src}
          alt="product"
          className="productImg"
          onClick={() => setSelected(id)}
        />
        <p className="productName">{name}</p>
        <p className="productPrice">Price: ${price}</p>
        <p className="productStock">Stock: {stock}</p>
        <div className="productSelection">
          <button type="submit" className="addProduct">
            <i
              className="fa-solid fa-circle-minus"
              onClick={() => changeSelectedAmount('decrement', id)}
            ></i>
          </button>
          <p className="selectedProduct">{amount || 1}</p>
          <button type="submit" className="removeProduct">
            <i
              className="fa-solid fa-circle-plus"
              onClick={() => changeSelectedAmount('increment', id)}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
