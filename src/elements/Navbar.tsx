import React from 'react';
import {Link} from 'react-router-dom'

export function Navbar() {

  return <div>
    <h1>Book Diary</h1>
    <Link to="dashboard">Change things</Link>
  </div>
}