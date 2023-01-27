import React from 'react';
import Login from '../Login/Login'
import useToken from './useToken';


export default function Dashboard() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return(
    <h2>Dashboard</h2>
  );
}