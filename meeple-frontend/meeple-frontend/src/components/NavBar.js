import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Import the CSS file
import logo from '../assets/images/meeple-logo.png'; // Import your logo image

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Image */}
        <img src={logo} alt="Meeple Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/catalog" className="navbar-link">Catalog</Link></li>
          <li><Link to="/login" className="navbar-link">Login</Link></li>
          <li><Link to="/collection" className="navbar-link">My Collection</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

