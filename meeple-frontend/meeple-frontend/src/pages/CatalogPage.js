import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

function CatalogPage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [genre, setGenre] = useState(''); // Filter by genre
    const [difficultyLevel, setDifficultyLevel] = useState(''); // Filter by difficulty
    const [sortBy, setSortBy] = useState(''); // Sort option

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Call the filtering endpoint
                const response = await axios.get('https://localhost:7263/api/games/filter', {
                    params: { genre, difficultyLevel, sortBy },
                });
                setGames(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch games. Please try again later.');
                setLoading(false);
            }
        };

        fetchGames();
    }, [genre, difficultyLevel, sortBy]); // Re-fetch when filters or sort option changes

    if (loading) return <p>Loading games...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Game Catalog</h1>

            {/* Filters */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>
                    Genre:
                    <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="">All</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Party">Party</option>
                        <option value="Family">Family</option>
                    </select>
                </label>

                <label style={{ marginRight: '10px' }}>
                    Difficulty Level:
                    <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>

                <label>
                    Sort By:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="">Default</option>
                        <option value="rating">Rating</option>
                        <option value="players">Players</option>
                    </select>
                </label>
            </div>

            {/* Game List */}
            <ul>
                {games.length > 0 ? (
                    games.map((game) => (
                        <li key={game.gameId} style={{ marginBottom: '20px' }}>
                            <h3>
                                {/* Add a Link to navigate to the Game Details page */}
                                <Link to={`/games/${game.gameId}`}>{game.name}</Link>
                            </h3>
                            <p>Genre: {game.genre}</p>
                            <p>Difficulty Level: {game.difficultyLevel}</p>
                            <p>Play Style: {game.playStyle}</p>
                            <p>Players: {game.players}</p>
                            <p>Rating: {game.boardGameArenaRating}</p>
                        </li>
                    ))
                ) : (
                    <p>No games found matching the selected criteria.</p>
                )}
            </ul>
        </div>
    );
}

export default CatalogPage;
