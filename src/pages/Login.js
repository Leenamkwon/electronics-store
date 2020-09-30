import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = false;

  const toggleMember = () => {};

  const handleSubmit = async (e) => {};

  return <h1>hello from login page</h1>;
}
