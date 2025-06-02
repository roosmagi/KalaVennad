import React, { useEffect, useState } from 'react';
import { getAllFishes } from '../api/fish';
import './Home.css';

function Home() {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        const data = await getAllFishes();
        setFishes(data.fishes);
      } catch (err) {
        console.error(err);
        setError('Kalade laadimine ebaõnnestus');
      } finally {
        setLoading(false);
      }
    };

    fetchFishes();
  }, []);

  return (
    <div className="home-container">
      <h2>Kalad</h2>
      {loading && <p>Laen kalu...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="fish-grid">
        {fishes.map((fish) => (
          <div key={fish.id} className="fish-card">
            <img
              src={`http://localhost:3002/uploads/${fish.image}`}
              alt={fish.name}
              className="fish-image"
            />
            <h3>{fish.name}</h3>
            <p><strong>Kirjeldus:</strong> {fish.description}</p>
            <p><strong>Koht:</strong> {fish.place}</p>
            <p><strong>Püügiaeg:</strong> {new Date(fish.c_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
