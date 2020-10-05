// cart context
import React, { useEffect, useState } from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

const localData =
  localStorage.getItem('cart') !== null
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localData);
  const [total, setTotal] = useState(0);
  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    // local storage
    localStorage.setItem('cart', JSON.stringify(cart));

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

  const addToCart = (product) => {
    const { id, image, title, price } = product;

    const item = cart.find((item) => item.id === parseInt(id));

    if (item) {
      increaseAmount(id);
    } else {
      setCart([...cart, { id, image, title, price, amount: 1 }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItem,
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
