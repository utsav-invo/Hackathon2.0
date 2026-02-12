import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@demo.com' && password === 'admin123') {
      // In a real app, you'd set authentication state or token here
      navigate('/admin-dashboard');
    } else {
      alert('❌ Invalid credentials');
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">Medicine Tracker</a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#apply">Apply as Candidate</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Login Form */}
        <div className="hero" style={{textAlign: 'center'}}>
          <h1>Admin Login</h1>
          <p>Access the admin dashboard to manage medicine inventory.</p>

          <form onSubmit={handleLogin} style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginTop: '40px'
          }}>
            <p style={{marginBottom: '20px', color: '#6b7280'}}><strong>Demo:</strong> admin@demo.com / admin123</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
