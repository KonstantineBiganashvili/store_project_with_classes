import React, { Component } from 'react';
import Axios from 'axios';

import ProductList from '../ProductList';
import Header from '../Header';

export default class App extends Component {
  state = {
    sum: 0,
    inputText: '',
    basket: JSON.parse(localStorage.getItem('Basket')) || {},
    allProducts: [],
  };

  componentDidMount = async () => {
    await Axios.get('./data.json').then((res) => {
      let newProducts = res.data;
      const localBasket = JSON.parse(localStorage.getItem('Basket'));
      let newSum = 0;

      newProducts = newProducts.map((oldProduct) => {
        if (localBasket.hasOwnProperty(oldProduct.id)) {
          newSum = newSum + localBasket[oldProduct.id] * oldProduct.price;
          oldProduct.amount = localBasket[oldProduct.id];
        }

        return oldProduct;
      });

      this.setState({
        sum: newSum,
        allProducts: newProducts,
      });
    });
  };

  setSelected = (id) => {
    const newProducts = this.state.allProducts.map((oldProduct) => {
      if (oldProduct.id === id) {
        if (!oldProduct.amount) {
          oldProduct.amount = 1;
        }
        if (!this.state.basket.hasOwnProperty(id)) {
          this.setState({
            basket: {
              ...this.state.basket,
              [id]: oldProduct.amount || 1,
            },
          });

          this.setState({
            sum: this.state.sum + oldProduct.price * oldProduct.amount,
          });
        } else if (this.state.basket.hasOwnProperty(id)) {
          const currentBasket = this.state.basket;
          delete currentBasket[id];

          this.setState({
            basket: currentBasket,
          });

          this.setState({
            sum: this.state.sum - oldProduct.price * oldProduct.amount,
          });
        }
      }

      return oldProduct;
    });

    this.setState({
      allProducts: newProducts,
    });
  };

  /* Header branch */

  updateValue = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  /* Header branch */

  /* Increment/Decrement branch */
  changeSelectedAmount = (string, id) => {
    if (this.state.basket.hasOwnProperty(id)) {
      if (string === 'increment') {
        const newProducts = this.state.allProducts.map((oldProduct) => {
          if (oldProduct.id === id) {
            if (!oldProduct.amount) {
              oldProduct.amount = 1;
            }
            if (oldProduct.amount !== oldProduct.stock) {
              oldProduct.amount = oldProduct.amount + 1;
            }

            this.setState({
              basket: {
                ...this.state.basket,
                [id]: oldProduct.amount,
              },
            });
            this.setState({
              sum: this.state.sum + oldProduct.price,
            });
          }
          return oldProduct;
        });

        this.setSelected({
          allProducts: newProducts,
        });
      } else if (string === 'decrement') {
        const newProducts = this.state.allProducts.map((oldProduct) => {
          if (oldProduct.id === id) {
            if (!oldProduct.amount) {
              oldProduct.amount = 1;
            }
            if (oldProduct.amount > 0) {
              console.log(oldProduct.amount);
              oldProduct.amount = oldProduct.amount - 1;
            }
            if (oldProduct.amount === 0) {
              const currentBasket = this.state.basket;
              delete currentBasket[id];

              this.setState({
                basket: currentBasket,
              });
            }

            if (this.state.basket.hasOwnProperty(id) && oldProduct.amount > 0) {
              this.setState({
                basket: {
                  ...this.state.basket,
                  [id]: oldProduct.amount,
                },
              });
            }

            this.setState({
              sum: this.state.sum - oldProduct.price,
            });
          }
          return oldProduct;
        });

        this.setSelected({
          allProducts: newProducts,
        });
      }
    }
  };
  /* Increment/Decrement branch */

  render = () => {
    localStorage.setItem('Basket', JSON.stringify(this.state.basket));

    return (
      <>
        {/* Header branch */}
        <Header
          sum={this.state.sum}
          inputText={this.state.inputText}
          updateValue={this.updateValue}
        />
        {/* Header branch */}
        <div id="products">
          <ProductList
            products={this.state.allProducts}
            setSelected={this.setSelected}
            changeSelectedAmount={this.changeSelectedAmount}
          />
        </div>
      </>
    );
  };
}
