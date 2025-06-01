import React, { useState } from 'react';
import { addFish } from '../api/fish';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Lisa kala</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Kala nimi"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Kirjeldus"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="place"
          placeholder="Püügikoht"
          value={form.place}
          onChange={handleChange}
        />
        <br />
        <input
          type="datetime-local"
          name="c_time"
          value={form.c_time}
          onChange={handleChange}
          required
        />
        <br />

        {/* Lohistamisala */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #aaa',
            padding: '20px',
            margin: '10px 0',
            backgroundColor: dragActive ? '#f0f0f0' : '#fff',
          }}
        >
          <p>
            {form.image ? (
              <strong>Fail valitud: {form.image.name}</strong>
            ) : (
              'Lohista siia pilt või vali all nupuga'
            )}
          </p>
        </div>

        {/* Varjatud input failivalikuks */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!form.image}
        />

        <br />
        <button type="submit">Lisa kala</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default AddFish;
