import React, { useState } from 'react';
import { login } from '../api/auth';
import { Link } from 'react-router-dom'; 

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setToken(res.data.token);
      setMessage('Sisselogimine õnnestus');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Midagi läks valesti');
    }
  };

  return (
    <div>
      <h2>Logi sisse</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-post" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Parool" onChange={handleChange} required />
        <button type="submit">Logi sisse</button>
      </form>
      <p>Ei ole veel kontot? <Link to="/register">Loo konto</Link></p>
      <p>{message}</p>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
