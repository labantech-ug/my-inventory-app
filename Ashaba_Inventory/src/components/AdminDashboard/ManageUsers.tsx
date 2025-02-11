import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  role: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('user');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const newUser = { username: newUsername, password: newPassword, role: newRole };
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers([...users, response.data]);
      setNewUsername('');
      setNewPassword('');
      setNewRole('user');
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user');
    }
  };

  const handleEditUser = (id: number) => {
    // Logic to edit user, e.g., show a form to edit user details
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRole(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Role:</label>
          <select
            value={newRole}
            onChange={handleRoleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;