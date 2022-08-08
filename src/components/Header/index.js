import React from 'react';
import './Header.css';

export default function Header(props) {
  const { updateValue, sum, value } = props;

  return (
    <header id="header">
      <img src="logo.png" alt="logo" id="logoImg" />
      <input
        id="searchInput"
        type="text"
        placeholder="Name Of The Product"
        onInput={(e) => updateValue(e)}
        value={value}
      />
      <button type="submit" id="searchBtn" /* onClick={searchFunction} */>
        Search
      </button>
      <p>Total sum of chosen products: ${sum} USD</p>
    </header>
  );
}
