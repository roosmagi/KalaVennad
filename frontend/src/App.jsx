import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddFish from './pages/AddFish.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/addfish' element={<AddFish />} /> 
        <Route path="/" element={<h1>Kalavennad</h1>} />
      </Routes>
    </Router>
  );
}
