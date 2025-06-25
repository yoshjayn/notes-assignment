import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { username, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <h1>My Notes</h1>
        <div className="user-section">
          <span className="username">Hello, {username}!</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;