// cart context
import React, { useEffect, useState } from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localCart);
  const [total, setTotal] = useState(0);
  const [carItem, setCartItem] = useState(0);

  useEffect(() => {
    let newCartItems = cart.reduce((total, cartItem) => {
      return total + cartItem.amount;
    }, 0);
    setCartItem(newCartItems);

    let newTotal = cart.reduce((total, cartItem) => {
      return total + cartItem.amount * cartItem.price;
    }, 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [cart]);

  // remove item
  const removeItem = (id) => {
    const filter = cart.filter((item) => item.id !== id);
    setCart(filter);
  };

  const increaseAmount = (id) => {
    const newCart = [...cart].map((item) => {
      return item.id === id
        ? { ...item, amount: item.amount + 1 }
        : { ...item };
    });
    setCart(newCart);
  };

  const decreaseAmount = (id, amount) => {
    if (amount > 1) {
      const newCart = [...cart].map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(newCart);
    }
    return;
  };

  const addToCart = (product) => {};
  const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        carItem,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
