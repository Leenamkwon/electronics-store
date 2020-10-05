import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import CartLink from './Cart/CartLink';
import { UserContext } from '../context/user';
import LoginLink from '../components/LoginLink';

export default function Header() {
  const { user } = useContext(UserContext);

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
            {user.token && (
              <li>
                <Link to='/checkout'>CHECKOUT</Link>
              </li>
            )}
          </div>
          <div>
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  );
}
