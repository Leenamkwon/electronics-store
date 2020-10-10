import React, { useContext } from 'react';
import { ProductContext } from '../context/products';
import Loading from '../components/Loading';
import Filters from '../components/Products/Filters';
import Pagination from '../components/Products/pagination';

export default function Products() {
  const { loading } = useContext(ProductContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Filters />
      <Pagination />
    </>
  );
}
