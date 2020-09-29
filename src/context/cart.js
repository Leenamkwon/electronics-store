// cart context
import React, { useState } from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localCart);
  const [total, setTotal] = useState(0);
  const [carItem, setCartItem] = useState(0);

  return (
    <CartContext.Provider value={{ cart, total, carItem }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
