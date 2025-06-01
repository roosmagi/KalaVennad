import React, { useState } from 'react';
import { register } from '../api/auth';
import { Link } from 'react-router-dom'; 


export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Midagi läks valesti');
    }
  };

  return (
    <div>
      <h2>Registreeru</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nimi" onChange={handleChange} required />
        <input type="email" name="email" placeholder="E-post" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Parool" onChange={handleChange} required />
        <button type="submit">Registreeri</button>
      </form>
      <p>Juba konto olemas? <Link to="/login">Logi sisse</Link></p>
      <p>{message}</p>
    </div>
  );
}
