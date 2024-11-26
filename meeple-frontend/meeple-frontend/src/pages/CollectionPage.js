import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CollectionPage.css';

function CollectionPage() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollection = async () => {
      const userId = localStorage.getItem('userId'); // Get dynamic userId
      if (!userId) {
        console.error('No userId found in localStorage');
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7263/api/collections/${userId}`);
        setCollection(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch collection. Please try again later.');
        setLoading(false);
      }
    };

    fetchCollection();
  }, []);

  const removeFromCollection = async (gameId) => {
    const userId = localStorage.getItem('userId'); // Get dynamic userId
    try {
      await axios.delete(`https://localhost:7263/api/collections/${userId}/remove/${gameId}`);
      alert('Game removed from your collection!');
      setCollection(collection.filter((game) => game.gameId !== gameId)); // Update UI
    } catch (err) {
      console.error(err);
      alert('Failed to remove game from collection.');
    }
  };

  if (loading) return <p className="loading-message">Loading your collection...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="collection-page">
      <h1 className="collection-title">My Collection</h1>
      {collection.length > 0 ? (
        <ul className="game-list">
          {collection.map((game) => (
            <li key={game.gameId} className="game-item">
              <h3 className="game-title">{game.name}</h3>
              <div className="game-details">
                <p>Genre: {game.genre}</p>
                <p>Difficulty Level: {game.difficultyLevel}</p>
                <p>Play Style: {game.playStyle}</p>
                <p>Players: {game.players}</p>
                <p>Rating: {game.boardGameArenaRating}</p>
              </div>
              <button
                onClick={() => removeFromCollection(game.gameId)}
                className="remove-button"
              >
                Remove from My Collection
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">Your collection is empty.</p>
      )}
    </div>
  );
}

export default CollectionPage;
