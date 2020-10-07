import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';

const pagination = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sorted, page, changePage } = useContext(ProductContext);

  return <ProductList title='원하는 제품을 구경하세요' products={sorted} />;
};

export default pagination;
