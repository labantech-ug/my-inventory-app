import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const startApp = async () => {
  console.log('Starting App...');
  // Comment out database connection for now to isolate the issue
  // await connectDB();
  // await syncDatabase();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App Started');
};

startApp();