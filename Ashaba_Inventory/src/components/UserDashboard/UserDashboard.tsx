import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/edit-profile">Edit Profile</Link></li> 
          <li><Link to="/stock-out">Stock Out</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default UserDashboard;