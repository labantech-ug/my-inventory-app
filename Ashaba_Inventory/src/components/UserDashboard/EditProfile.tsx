import React, { useState } from 'react';
import axios from 'axios';

const EditProfile: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async () => {
    try {
      const response = await axios.put('http://localhost:5000/profile/password', {
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Error changing password');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default EditProfile;