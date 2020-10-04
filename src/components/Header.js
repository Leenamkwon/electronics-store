import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import CartLink from './Cart/CartLink';

export default function Header() {
  return (
    <header className='header'>
      <img src={Logo} alt='logo' className='logo' />
      <nav>
        <ul>
          <div>
            <li>
              <Link to='/'>HOME</Link>
            </li>
            <li>
              <Link to='/about'>ABOUT</Link>
            </li>
            <li>
              <Link to='/products'>PRODUCTS</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <CartLink />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
