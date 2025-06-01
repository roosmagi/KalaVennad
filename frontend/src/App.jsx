import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddFish from './pages/AddFish.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/addfish' element={<AddFish />} /> 
      </Routes>
    </Router>
  );
}
