import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username;

  const toggleMember = () => {
    setPassword('');
    setEmail('');
    setIsMember((prev) => {
      let isMember = !prev;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };
  const handleSubmit = async (e) => {
    // alert
    e.preventDefault();
    let response;

    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }

    if (response) {
      console.log('success');
      console.log(response);
    } else {
      console.log('fuck');
    }
  };

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? '로그인' : '회원가입'}</h2>
      <form className='login-form'>
        <div className='form-control'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isMember && (
          <div className='form-control'>
            <label htmlFor='username'>닉네임</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {isEmpty && <p className='form-empty'>양식을 다 채워주세요</p>}

        {!isEmpty && (
          <button
            type='submit'
            className='btn btn-block btn-primary'
            onClick={handleSubmit}
          >
            {isMember ? '로그인 하기' : '가입 하기'}
          </button>
        )}

        <p className='register-link'>
          {isMember ? '회원이 아직 아니신가요?' : '회원이 이미 있으신가요?'}
          <button type='button' onClick={toggleMember}>
            Click Here
          </button>
        </p>
      </form>
    </section>
  );
}
