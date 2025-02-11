import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    console.log('User logged out');
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
      Logout
    </button>
  );
};

export default Logout;