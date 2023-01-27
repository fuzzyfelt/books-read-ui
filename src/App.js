import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}