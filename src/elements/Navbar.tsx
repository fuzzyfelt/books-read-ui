import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

export function Navbar() {

  return <div className='nav-header'>
    <h3>Book Diary</h3>
    <Link to="dashboard">Admin</Link>
  </div>
}