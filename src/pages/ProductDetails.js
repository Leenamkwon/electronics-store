import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductContext } from '../context/products';
// import { CartContext } from '../context/cart';
import Loading from '../components/Loading';

export default function ProductDetails() {
  let { id } = useParams();
  const history = useHistory();
  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === parseInt(id));
  if (products.length === 0) {
    return <Loading />;
  }

  return <h1>hello from product details page{id}</h1>;
}
