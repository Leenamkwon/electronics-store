import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <section className='empty-cart section'>
      <h2>장바구니가 비었습니다.</h2>
      <Link to='/products' className='btn btn-primary'>
        쇼핑하러 가기
      </Link>
    </section>
  );
}
