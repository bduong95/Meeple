import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollectionPage() {
    const [userId] = useState('U001'); // Hardcoded user ID for now
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCollection = async () => {
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
    }, [userId]);

    const removeFromCollection = async (gameId) => {
        try {
            await axios.delete(`https://localhost:7263/api/collections/${userId}/remove/${gameId}`);
            alert('Game removed from your collection!');
            setCollection(collection.filter((game) => game.gameId !== gameId)); // Update the UI
        } catch (err) {
            console.error(err);
            alert('Failed to remove game from collection.');
        }
    };

    if (loading) return <p>Loading your collection...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>My Collection</h1>
            {collection.length > 0 ? (
                <ul>
                    {collection.map((game) => (
                        <li key={game.gameId} style={{ marginBottom: '20px' }}>
                            <h3>{game.name}</h3>
                            <p>Genre: {game.genre}</p>
                            <p>Difficulty Level: {game.difficultyLevel}</p>
                            <p>Play Style: {game.playStyle}</p>
                            <p>Players: {game.players}</p>
                            <p>Rating: {game.boardGameArenaRating}</p>
                            <button onClick={() => removeFromCollection(game.gameId)}>
                                Remove from My Collection
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your collection is empty.</p>
            )}
        </div>
    );
}

export default CollectionPage;
