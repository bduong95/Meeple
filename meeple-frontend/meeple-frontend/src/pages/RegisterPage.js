import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to generate a random UserId
  const generateUserId = () => {
    return 'U' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userId = generateUserId(); // Generate unique userId

    try {
      const newUser = {
        userId,
        username,
        email,
        password,
      };

      const response = await axios.post('https://localhost:7263/api/users', newUser);

      console.log('User registered:', response.data); // Debugging response
      alert('Registration successful!');
      setError('');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      setError('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default RegistrationPage;
