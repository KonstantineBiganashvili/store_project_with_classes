import React, { Component } from 'react';
import { Product } from './components/Product';
import Axios from 'axios';

export default class App extends Component {
  state = {
    sum: 50,
    inputText: '',
    basket: JSON.parse(localStorage.getItem('Basket')) || {},
    allProducts: [],
  };

  componentDidMount = async () => {
    Axios.get('./data.json').then((res) =>
      this.setState({
        allProducts: res.data,
      })
    );
  };

  products = () =>
    this.state.allProducts.map((element) => (
      <Product key={element.action} element={element} />
    ));

  // products = () => {
  //   this.state.allProducts.map((element) => (
  //     <Product
  //       key={element.id}
  //       element={element}
  //       // changeSelectedAmount={changeSelectedAmount}
  //       // changeSelected={changeSelected}
  //     />
  //   ));
  // };

  render = () => (
    <>
      <div id="products">{this.products()}</div>
    </>
  );
}
