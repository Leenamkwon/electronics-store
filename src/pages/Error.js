import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <section className='error-page section'>
      <div className='error-container'>
        <h1>Oops..! 번지수를 잘못찾으셨어요</h1>
        <Link to='/' className='btn btn-primary'>
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
