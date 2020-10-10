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
      setProducts(flattenProducts(response.data));
      setSorted(paginate(flattenProducts(response.data)));
      setFeatured(featuredProducts(flattenProducts(response.data)));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;

    if (category !== 'all') {
      newProducts = newProducts.filter((item) => item.category === category);
    }

    if (search) {
      newProducts = newProducts.filter(
        (item) => item.title.toLowerCase().trim().startsWith(search, 0) || null
      );
    }

    if (shipping !== false) {
      newProducts = newProducts.filter((item) => item.Freeshipping === true);
    }

    if (price !== 'all') {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 600;
        } else {
          return item.price >= 650;
        }
      });
    }

    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  const changePage = (index) => {
    if (index < 0 || index > sorted.length - 1) {
      return;
    } else {
      setPage(index);
    }
  };

  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  };

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
