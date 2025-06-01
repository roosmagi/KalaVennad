import React, { useEffect, useState } from 'react';
import { getAllFishes } from '../api/fish';

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
    <div>
      <h2>Kalad</h2>
      {loading && <p>Laen kalu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {fishes.map(fish => (
          <div key={fish.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            <img
              src={`http://localhost:3002/uploads/${fish.image}`}
              alt={fish.name}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
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
