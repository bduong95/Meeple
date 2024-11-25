import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GameDetailsPage() {
    const { gameId } = useParams(); // Get the game ID from the URL
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`https://localhost:7263/api/games/${gameId}`);
                setGame(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch game details.');
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [gameId]);

    if (loading) return <p>Loading game details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!game) return <p>Game not found.</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Difficulty Level:</strong> {game.difficultyLevel}</p>
            <p><strong>Play Style:</strong> {game.playStyle}</p>
            <p><strong>Players:</strong> {game.players}</p>
            <p><strong>Rating:</strong> {game.boardGameArenaRating}</p>
        </div>
    );
}

export default GameDetailsPage;
