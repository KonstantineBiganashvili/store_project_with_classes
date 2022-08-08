import React from 'react';
import Product from '../Product';

const ProductList = (props) => {
  const { products, setSelected, changeSelectedAmount } = props;

  return products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      element={product}
      setSelected={setSelected}
      changeSelectedAmount={changeSelectedAmount}
    />
  ));
};

export default ProductList;
