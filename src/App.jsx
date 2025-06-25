import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/Header/Header';
import NotesList from './components/NotesList/NotesList';
import './App.css';

// Main app component that uses auth context
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated ? (
        <>
          <Header />
          <main className="main-content">
            <NotesList />
          </main>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

// Root App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;