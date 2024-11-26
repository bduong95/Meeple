import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../styles/NavBar.css';
import logo from '../assets/images/meeple-logo.png';

function NavBar() {
  const { isLoggedIn, userId, logout } = useContext(AuthContext); // Use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Meeple Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/catalog" className="navbar-link">Catalog</Link></li>
          {!isLoggedIn && <li><Link to="/register" className="navbar-link">Register</Link></li>}
          {isLoggedIn ? (
            <>
              <li><span className="navbar-username">Welcome, User {userId}!</span></li>
              <li>
                <button onClick={handleLogout} className="navbar-link navbar-logout">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="navbar-link">Login</Link></li>
          )}
          <li><Link to="/collection" className="navbar-link">My Collection</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
