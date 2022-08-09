import React, { Component } from 'react';
import Axios from 'axios';

import ProductList from '../ProductList';
import Header from '../Header';

export default class App extends Component {
  state = {
    inputText: '',
    basket: JSON.parse(localStorage.getItem('Basket')) || {},
    allProducts: [],
    filteredProducts: [],
  };

  componentDidMount = () => {
    Axios.get('./data.json').then((res) => {
      let newProducts = res.data;
      const localBasket = JSON.parse(localStorage.getItem('Basket'));

      newProducts = newProducts.map((oldProduct) => {
        if (localBasket.hasOwnProperty(oldProduct.id)) {
          oldProduct.amount = localBasket[oldProduct.id];
        }

        return oldProduct;
      });

      this.setState({
        allProducts: newProducts,
      });
    });
  };

  setBasket = (id, amount, string) => {
    this.setState((oldState) => {
      const { basket } = this.state;

      if (
        !basket.hasOwnProperty(id) ||
        string === 'increment' ||
        string === 'decrement'
      ) {
        if (amount === 0) {
          return delete basket[id];
        }

        basket[id] = amount || 1;
      } else if (basket.hasOwnProperty(id)) {
        delete basket[id];
      }

      return oldState;
    });
  };

  setSum = () => {
    const { allProducts, basket } = this.state;

    const totalSum = allProducts.reduce((sum, element) => {
      if (basket.hasOwnProperty(element.id)) {
        return sum + element.price * element.amount;
      }

      return sum;
    }, 0);

    return totalSum;
  };

  /* Header branch */

  updateValue = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  searchFunction = () => {
    const filteredProducts = this.state.allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(this.state.inputText.toLowerCase());
    });

    this.setState({
      filteredProducts: filteredProducts,
    });
  };

  /* Header branch */

  /* Increment/Decrement branch */
  changeSelectedAmount = (string, id) => {
    if (this.state.basket.hasOwnProperty(id)) {
      this.state.allProducts.map((oldProduct) => {
        if (oldProduct.id === id) {
          if (!oldProduct.amount) {
            oldProduct.amount = 1;
          }
          if (string === 'increment') {
            oldProduct.amount = oldProduct.amount + 1;
          } else if (string === 'decrement') {
            oldProduct.amount = oldProduct.amount - 1;
          }

          this.setBasket(id, oldProduct.amount, string);
        }

        return oldProduct;
      });
    }
  };
  /* Increment/Decrement branch */

  render = () => {
    localStorage.setItem('Basket', JSON.stringify(this.state.basket));

    const sum = this.setSum();

    return (
      <>
        {/* Header branch */}
        <Header
          sum={sum || 0}
          inputText={this.state.inputText}
          updateValue={this.updateValue}
          searchFunction={this.searchFunction}
        />
        {/* Header branch */}
        <div id="products">
          <ProductList
            products={
              this.state.filteredProducts.length
                ? this.state.filteredProducts
                : this.state.allProducts
            }
            changeSelectedAmount={this.changeSelectedAmount}
            setBasket={this.setBasket}
          />
        </div>
      </>
    );
  };
}
