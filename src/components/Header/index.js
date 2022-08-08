import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
  render = () => (
    <header id="header">
      <img src="logo.png" alt="logo" id="logoImg" />
      <input
        id="searchInput"
        type="text"
        placeholder="Name Of The Product"
        onInput={(e) => this.props.updateValue(e)}
        value={this.props.value}
      />
      <button type="submit" id="searchBtn" /* onClick={searchFunction} */>
        Search
      </button>
      <p>Total sum of chosen products: ${this.props.sum} USD</p>
    </header>
  );
}
