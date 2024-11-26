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
    const [userId] = useState('U001');
    const [showAddGameForm, setShowAddGameForm] = useState(false);
    const [newGame, setNewGame] = useState({
        name: '',
        genre: '',
        difficultyLevel: '',
        players: 0,
        boardGameArenaRating: 0.0,
        playStyle: '',
    });
    

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
        try {
            await axios.post(`https://localhost:7263/api/collections/${userId}/add/${gameId}`);
            alert('Game added to your collection!');
        } catch (err) {
            console.error(err);
            alert('Failed to add game to collection.');
        }
    };

    const handleAddGame = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7263/api/games', newGame);
            alert('Game added successfully!');
            setShowAddGameForm(false);
            setNewGame({
                name: '',
                genre: '',
                difficultyLevel: '',
                players: 0,
                boardGameArenaRating: 0.0,
            });
            // Refresh the game list
            const response = await axios.get('https://localhost:7263/api/games/filter', {
                params: { genre, difficultyLevel, sortBy },
            });
            setGames(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to add game.');
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
                <button onClick={() => setShowAddGameForm(true)} className="add-game-button">
                    Add New Game
                </button>
            </nav>

            {/* Add Game Form */}
            {showAddGameForm && (
                <div className="add-game-form-container">
                    <form onSubmit={handleAddGame} className="add-game-form">
                        <h2>Add a New Game</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={newGame.name}
                                onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Genre:
                            <input
                                type="text"
                                value={newGame.genre}
                                onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Difficulty Level:
                            <input
                                type="text"
                                value={newGame.difficultyLevel}
                                onChange={(e) => setNewGame({ ...newGame, difficultyLevel: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Players:
                            <input
                                type="number"
                                value={newGame.players}
                                onChange={(e) => setNewGame({ ...newGame, players: parseInt(e.target.value, 10) })}
                                required
                            />
                        </label>
                        <label>
                            Board Game Arena Rating:
                            <input
                                type="number"
                                step="0.1"
                                value={newGame.boardGameArenaRating}
                                onChange={(e) => setNewGame({ ...newGame, boardGameArenaRating: parseFloat(e.target.value) })}
                                required
                            />
                        </label>
                        <label>
                            Play Style:
                            <input
                                type="text"
                                value={newGame.playStyle}
                                onChange={(e) => setNewGame({ ...newGame, playStyle: e.target.value })}
                                required
                            />
                        </label>
                        <button type="submit" className="submit-button">Add Game</button>
                        <button
                            type="button"
                            onClick={() => setShowAddGameForm(false)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

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
