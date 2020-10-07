// user context
import React, { createContext, useEffect, useState } from 'react';

function getUserFromLocalStr() {
  return localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null };
}

const UserContext = createContext();
const UserProvider = ({ children }) => {
  // const [user, setUser] = useState({ username: null, token: null });
  const [user, setUser] = useState(getUserFromLocalStr());
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [height]);

  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem('user');
  };

  const showAlert = ({ type = 'success', msg }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        showAlert,
        hideAlert,
        height,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
