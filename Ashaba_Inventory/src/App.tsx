import React, { useEffect } from 'react';
import './App.css'; // Ensure this file exists
import AppRoutes from './routes';
import { ProfileProvider } from './ProfileContext'; // Ensure this file exists

const App: React.FC = () => {
  useEffect(() => {
    console.log('App component rendered');
  }, []);

  return (
    <ProfileProvider>
      <div className="App">
      <h1>Welcome to Ashaba's Inventory Management System</h1>
        <AppRoutes />
      </div>
    </ProfileProvider>
  );
};

export default App;