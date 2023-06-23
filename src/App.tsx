import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import AddAuthor from "./components/Dashboard/AddAuthor";
import AddBook from "./components/Dashboard/AddBook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="author" element= {<AddAuthor/>} />
          <Route path="book" element= {<AddBook/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}