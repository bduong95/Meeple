import React from 'react';
import '../styles/HomePage.css'; // Importing the CSS file

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to Meeple!</h1>
        <p className="homepage-subtitle">
          Discover, manage, and enjoy your board game collection.
        </p>
        <button className="homepage-button">Get Started</button>
      </div>
    </div>
  );
}

export default HomePage;
