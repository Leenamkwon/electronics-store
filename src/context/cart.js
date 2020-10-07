// cart context
import React, { useEffect, useReducer, useState } from 'react';
import reducer from './reducer';

const CartContext = React.createContext();

const localData =
  localStorage.getItem('cart') !== null
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, localData);
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
    dispatch({ type: 'REMOVE', payload: id });
    // const filter = cart.filter((item) => item.id !== id);
    // setCart(filter);
  };

  const increaseAmount = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
    // const newCart = [...cart].map((item) => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });
    // setCart(newCart);
  };

  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({ type: 'REMOVE', payload: id });
      return;
    } else {
      dispatch({ type: 'DECREASE', payload: id });
    }
  };

  const addToCart = (product) => {
    const { id, image, title, price } = product;
    const item = cart.find((item) => item.id === parseInt(id));
    if (item) {
      dispatch({ type: 'INCREASE', payload: id });
    } else {
      dispatch({
        type: 'ADDTOCART',
        payload: { id, image, title, price, amount: 1 },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEARCART' });
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
