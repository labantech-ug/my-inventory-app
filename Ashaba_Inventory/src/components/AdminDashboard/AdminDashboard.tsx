import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SalesTrends from './SalesTrends';
import Profile from './Profile';
import TotalStock from './TotalStock';
import StockIn from './StockIn';
import StockOut from './StockOut';
import ManageSales from './ManageSales';
import ManageInventory from './ManageInventory';
import ProfitsLosses from './ProfitsLosses';
import GenerateReports from './GenerateReports';
import ManageUsers from './ManageUsers';
import GenerateInvoices from './GenerateInvoices';
import ManageExpenses from './ManageExpenses';
import ProfitLossStatement from './ProfitLossStatement';
import Notifications from './Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
  email: string;
  phoneNumber: string;
  section: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('SalesTrends');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile from backend
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('User logged out');
    navigate('/');
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'SalesTrends':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="content-box">
              <SalesTrends />
            </div>
            <div className="content-box">
              {userProfile && <Profile email={userProfile.email} phoneNumber={userProfile.phoneNumber} section={userProfile.section} />}
            </div>
          </div>
        );
      case 'TotalStock':
        return <TotalStock />;
      case 'StockIn':
        return <StockIn />;
      case 'StockOut':
        return <StockOut />;
      case 'ManageSales':
        return <ManageSales />;
      case 'ProfitsLosses':
        return <ProfitsLosses />;
      case 'GenerateReports':
        return <GenerateReports />;
      case 'ManageInventory':
        return <ManageInventory />;
      case 'ManageUsers':
        return <ManageUsers />;
      case 'GenerateInvoices':
        return <GenerateInvoices />;
      case 'ManageExpenses':
        return <ManageExpenses />;
      case 'ProfitLossStatement':
        return <ProfitLossStatement />;
      default:
        return <SalesTrends />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <FontAwesomeIcon icon={faBell} size="lg" onClick={() => setShowNotifications(!showNotifications)} className="cursor-pointer text-gray-600" />
            {showNotifications && (
              <div className="notifications">
                <Notifications />
              </div>
            )}
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} size="lg" onClick={() => setShowProfileMenu(!showProfileMenu)} className="cursor-pointer text-gray-600" />
            {showProfileMenu && (
              <ul className="profile-menu">
                <li className="profile-menu-item"><Link to="/admin-edit-profile">Edit Profile</Link></li>
                <li className="profile-menu-item"><button onClick={handleLogout} className="w-full text-left">Logout</button></li>
              </ul>
            )}
          </div>
        </div>
      </header>
      <div className="flex">
        <nav className="nav-container">
          <ul className="space-y-2 p-4">
            <li><button onClick={() => setSelectedComponent('SalesTrends')} className="nav-item">Dashboard</button></li>
            <li><button onClick={() => setSelectedComponent('TotalStock')} className="nav-item">Total Stock</button></li>
            <li><button onClick={() => setSelectedComponent('StockIn')} className="nav-item">Stock In</button></li>
            <li><button onClick={() => setSelectedComponent('StockOut')} className="nav-item">Stock Out</button></li>
            <li><button onClick={() => setSelectedComponent('ManageSales')} className="nav-item">Manage Sales</button></li>
            <li><button onClick={() => setSelectedComponent('ProfitsLosses')} className="nav-item">Profits/Losses</button></li>
            <li><button onClick={() => setSelectedComponent('GenerateReports')} className="nav-item">Generate Reports</button></li>
            <li><button onClick={() => setSelectedComponent('ManageInventory')} className="nav-item">Manage Inventory</button></li>
            <li><button onClick={() => setSelectedComponent('ManageUsers')} className="nav-item">Manage Users</button></li>
            <li><button onClick={() => setSelectedComponent('GenerateInvoices')} className="nav-item">Generate Invoices</button></li>
            <li><button onClick={() => setSelectedComponent('ManageExpenses')} className="nav-item">Manage Expenses</button></li>
            <li><button onClick={() => setSelectedComponent('ProfitLossStatement')} className="nav-item">Profit and Loss Statement</button></li>
          </ul>
        </nav>
        <main className="main-content">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;