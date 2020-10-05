import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
import { UserContext } from '../context/user';

export default function Login() {
  const history = useHistory();

  const { userLogin, alert, showAlert } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prev) => {
      let isMember = !prev;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }

    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { username, token };
      await userLogin(newUser);
      showAlert({ msg: `안녕하세요 ${username}님.` });
      history.push('/');
    } else {
      showAlert({
        msg: '없는 아이디 이거나 비밀번호가 틀렸습니다.',
        type: 'danger',
      });
    }
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
