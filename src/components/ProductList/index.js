import React from 'react';
import Product from '../Product';

const ProductList = (props) => {
  const { setBasket, products, setSelected, changeSelectedAmount } = props;

  return products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      element={product}
      allProducts={products}
      setSelected={setSelected}
      changeSelectedAmount={changeSelectedAmount}
      setBasket={setBasket}
    />
  ));
};

export default ProductList;
