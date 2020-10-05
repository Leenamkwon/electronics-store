import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
// import { UserContext } from '../context/user';

export default function Cart() {
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className='cart-items section'>
      <h2>장바구니</h2>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h2>총 가격 : ${total}</h2>
      {user.token ? (
        <Link to='/checkout' className='btn btn-primary btn-block'>
          결제하기
        </Link>
      ) : (
        <Link to='/login' className='btn btn-primary btn-block'>
          로그인하기
        </Link>
      )}
    </section>
  );
}
