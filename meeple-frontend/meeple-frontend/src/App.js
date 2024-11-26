import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import GameDetailsPage from './pages/GameDetailsPage';
import CollectionPage from './pages/CollectionPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/games/:gameId" element={<GameDetailsPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
