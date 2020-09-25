import React from 'react';

export default function Hero({ children }) {
  return (
    <div className='hero'>
      <div className='banner'>
        <h2>스마트폰, 노트북, 데스크톱</h2>
        <p>원하는 가전제품이 모두 있습니다.</p>
        {children}
      </div>
    </div>
  );
}
