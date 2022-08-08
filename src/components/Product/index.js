import React, { Component } from 'react';
import './Product.css';

export class Product extends Component {
  render = () => {
    const { element, changeSelectedAmount } = this.props;
    const { id, src, name, price, stock, amount } = element;
    const { setSelected } = this.props;

    let localBasket = JSON.parse(localStorage.getItem('Basket')) || {};

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
}
