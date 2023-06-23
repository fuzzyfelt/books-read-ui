import { useState } from 'react';
import type { Token } from '../../types';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token') as string;
    const userToken: Token = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }

}