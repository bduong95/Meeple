import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/CatalogPage.css'; // Import the CSS file

function CatalogPage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [genre, setGenre] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [sortBy, setSortBy] = useState('');
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    useEffect(() => {
        const fetchGames = async () => {
            try {
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
    }, [genre, difficultyLevel, sortBy]);

    const addToCollection = async (gameId) => {
        if (!userId) {
            alert('You must be logged in to add games to your collection.');
            return;
        }

        try {
            await axios.post(`https://localhost:7263/api/collections/${userId}/add/${gameId}`);
            alert('Game added to your collection!');
        } catch (err) {
            console.error(err);
            alert('Failed to add game to collection.');
        }
    };

    if (loading) return <p className="loading-message">Loading games...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="catalog-page">
            <h1 className="catalog-title">Game Catalog</h1>

            {/* Navigation */}
            <nav className="catalog-navigation">
                <Link to="/collection" className="catalog-link">View My Collection</Link>
            </nav>

            {/* Filters */}
            <div className="filters">
                <label>
                    Genre:
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">All</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Party">Party</option>
                        <option value="Family">Family</option>
                    </select>
                </label>

                <label>
                    Difficulty Level:
                    <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
                        <option value="">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>

                <label>
                    Sort By:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Default</option>
                        <option value="rating">Rating</option>
                        <option value="players">Players</option>
                    </select>
                </label>
            </div>

            {/* Game List */}
            <ul className="game-list">
                {games.length > 0 ? (
                    games.map((game) => (
                        <li key={game.gameId} className="game-item">
                            <h3 className="game-title">
                                <Link to={`/games/${game.gameId}`} className="game-link">{game.name}</Link>
                            </h3>
                            <p>Genre: {game.genre}</p>
                            <p>Difficulty Level: {game.difficultyLevel}</p>
                            <p>Play Style: {game.playStyle}</p>
                            <p>Players: {game.players}</p>
                            <p>Rating: {game.boardGameArenaRating}</p>
                            <button onClick={() => addToCollection(game.gameId)} className="save-button">
                                Save to My Collection
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="no-games-message">No games found matching the selected criteria.</p>
                )}
            </ul>
        </div>
    );
}

export default CatalogPage;
