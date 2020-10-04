import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password;
  console.log(isEmpty);

  const toggleMember = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
      <form className='login-form'>
        <div className='form-control'>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isMember && (
          <div className='form-control'>
            <label htmlFor='username'>사용자 이름</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {isEmpty && <p className='form-empty'>양식을 모두 채워주세요.</p>}

        {!isEmpty && (
          <button
            type='submit'
            className='btn btn-block btn-primary'
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

        <p className='register-link'>
          {isMember ? 'need to register' : 'already member'}
          <button type='button' onClick={toggleMember}>
            Click here
          </button>
        </p>
      </form>
    </section>
  );
}
