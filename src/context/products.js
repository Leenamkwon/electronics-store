// products context
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

const ProductContext = createContext();

// Provider, Consumer
const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      setProducts(paginate(flattenProducts(response.data)));
      setSorted(paginate(flattenProducts(response.data)));
      setFeatured(featuredProducts(flattenProducts(response.data)));
      setLoading(false);
    });
  }, []);

  const changePage = (index) => {
    if (index < 0 || index > sorted.length - 1) {
      return;
    } else {
      setPage(index);
    }
  };

  const updateFilters = (e) => {};

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
