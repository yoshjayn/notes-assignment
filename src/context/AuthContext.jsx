import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!username);

  const login = (newUsername) => {
    setUsername(newUsername);
    setIsAuthenticated(true);
    localStorage.setItem('username', newUsername);
  };

  const logout = () => {
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('username');
  };

  const value = {
    username,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};