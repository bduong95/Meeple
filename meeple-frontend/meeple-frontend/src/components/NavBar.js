import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>

      </ul>
    </nav>
  );
}

export default NavBar;