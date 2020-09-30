// products context
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts } from '../utils/helpers';

const ProductContext = createContext();

// Provider, Consumer
const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      setProducts(flattenProducts(response.data));
      setFeatured(featuredProducts(flattenProducts(response.data)));
      setLoading(false);
    });
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
