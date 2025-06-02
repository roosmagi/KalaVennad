import React, { useState } from 'react';
import { addFish } from '../api/fish';
import { useNavigate } from 'react-router-dom';
import './AddFish.css';

function AddFish() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    place: '',
    c_time: '',
    image: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('place', form.place);
    formData.append('c_time', form.c_time);
    formData.append('image', form.image);

    try {
      await addFish(formData);
      setSuccess('Kala lisatud!');
      setForm({ name: '', description: '', place: '', c_time: '', image: null });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Midagi läks valesti');
    }
  };

  return (
    <div className="addfish-container">
      <h2>Lisa uus kala</h2>
      <form onSubmit={handleSubmit} className="addfish-form" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Kala nimi"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Kirjeldus"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="place"
          placeholder="Püügikoht"
          value={form.place}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="c_time"
          value={form.c_time}
          onChange={handleChange}
          required
        />
        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>{form.image ? `Fail valitud: ${form.image.name}` : 'Lohista siia pilt või vali fail'}</p>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!form.image}
        />
        <button type="submit">Lisa kala</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  );
}

export default AddFish;
