import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import TotalStock from './components/AdminDashboard/TotalStock';
import StockIn from './components/AdminDashboard/StockIn';
import StockOut from './components/AdminDashboard/StockOut';
import ManageSales from './components/AdminDashboard/ManageSales';
import ProfitsLosses from './components/AdminDashboard/ProfitsLosses';
import GenerateReports from './components/AdminDashboard/GenerateReports';
import ManageUsers from './components/AdminDashboard/ManageUsers';
import AdminEditProfile from './components/AdminDashboard/EditProfile';
import UserEditProfile from './components/UserDashboard/EditProfile';
import Logout from './components/Logout';
import ManageInventory from './components/AdminDashboard/ManageInventory';
import ManageOrders from './components/AdminDashboard/ManageOrders';
import GenerateInvoices from './components/AdminDashboard/GenerateInvoices';
import SalesTrends from './components/AdminDashboard/SalesTrends';
import ManageExpenses from './components/AdminDashboard/ManageExpenses';
import ProfitLossStatement from './components/AdminDashboard/ProfitLossStatement';
import Notifications from './components/AdminDashboard/Notifications';
import EditSale from './components/AdminDashboard/EditSale';
import EditInventory from './components/AdminDashboard/EditInventory';

const ProtectedRoute: React.FC<{ component: React.FC, roles: string[] }> = ({ component: Component, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

const AppRoutes: React.FC = () => {
  useEffect(() => {
    console.log('AppRoutes component rendered');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} roles={['admin']} />} />
        <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} roles={['user']} />} />
        <Route path="/total-stock" element={<ProtectedRoute component={TotalStock} roles={['admin']} />} />
        <Route path="/stock-in" element={<ProtectedRoute component={StockIn} roles={['admin']} />} />
        <Route path="/stock-out" element={<ProtectedRoute component={StockOut} roles={['admin', 'user']} />} />
        <Route path="/manage-sales" element={<ProtectedRoute component={ManageSales} roles={['admin']} />} />
        <Route path="/profits-losses" element={<ProtectedRoute component={ProfitsLosses} roles={['admin']} />} />
        <Route path="/reports/*" element={<ProtectedRoute component={GenerateReports} roles={['admin']} />} />
        <Route path="/manage-users" element={<ProtectedRoute component={ManageUsers} roles={['admin']} />} />
        <Route path="/admin-edit-profile" element={<ProtectedRoute component={AdminEditProfile} roles={['admin']} />} />
        <Route path="/edit-profile" element={<ProtectedRoute component={UserEditProfile} roles={['admin', 'user']} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/manage-inventory" element={<ProtectedRoute component={ManageInventory} roles={['admin']} />} />
        <Route path="/manage-orders" element={<ProtectedRoute component={ManageOrders} roles={['admin']} />} />
        <Route path="/generate-invoices" element={<ProtectedRoute component={GenerateInvoices} roles={['admin']} />} />
        <Route path="/sales-trends" element={<ProtectedRoute component={SalesTrends} roles={['admin']} />} />
        <Route path="/manage-expenses" element={<ProtectedRoute component={ManageExpenses} roles={['admin']} />} />
        <Route path="/profit-loss-statement" element={<ProtectedRoute component={ProfitLossStatement} roles={['admin']} />} />
        <Route path="/notifications" element={<ProtectedRoute component={Notifications} roles={['admin']} />} />
        <Route path="/sale/edit/:id" element={<ProtectedRoute component={EditSale} roles={['admin']} />} />
        <Route path="/inventory/edit/:id" element={<ProtectedRoute component={EditInventory} roles={['admin']} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;