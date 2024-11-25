import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css'; // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend login API URL
      const response = await axios.post('https://localhost:7263/api/users/login', {
        email,
        password,
      });

      // Handle success (e.g., save token to localStorage)
      localStorage.setItem('token', response.data.token);
      setError('');
      alert('Login successful!');
    } catch (err) {
      // Handle error (e.g., incorrect credentials)
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
