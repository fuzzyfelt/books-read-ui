import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Login from '../Login/Login'
import useToken from './useToken';


export default function Dashboard() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <>
      <h2>Dashboard</h2>
      <Link to="/dashboard/author">Add an Author</Link><br/>
      <Link to="/dashboard/book">Add a Book</Link>
      <Outlet context={{session: token}}/>
    </>
  );
}