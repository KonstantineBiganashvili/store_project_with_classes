import React, { Component } from 'react';
import './Product.css';

<<<<<<< Updated upstream
let localBasket = localStorage.getItem('Basket');
=======
const Product = (props) => {
  const { allProducts, setBasket, element, changeSelectedAmount } = props;
  const { id, src, name, price, stock, amount } = element;
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes

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
>>>>>>> Stashed changes

export class Product extends Component {
  render = () => {
    const { element } = this.props;
    const { src, name, price, stock, amount } = element;

    return (
      <div className="main-container">
        <div
          className={
            localBasket.hasOwnProperty(1)
              ? 'selected-product-box'
              : 'unselected-product-box'
          }
        >
          <img src={src} alt="product" className="productImg" />
          <p className="productName">{name}</p>
          <p className="productPrice">Price: ${price}</p>
          <p className="productStock">Stock: {stock}</p>
          <div className="productSelection">
            <button type="submit" className="addProduct">
              <i className="fa-solid fa-circle-minus"></i>
            </button>
            <p className="selectedProduct">{amount || 1}</p>
            <button type="submit" className="removeProduct">
              <i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
}
