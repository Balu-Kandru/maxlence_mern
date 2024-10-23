import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import { IsUserLoggedIn, Protected } from './helpers/common';
import DataGrid from './pages/TableData';
import UpdateProfile from './pages/EditProfile';
import CreateContent from './pages/CreateContent';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IsUserLoggedIn><Login /></IsUserLoggedIn>} />
        <Route path="/register" element={<IsUserLoggedIn><Register /></IsUserLoggedIn>} />
        <Route path="/forgot-password" element={<IsUserLoggedIn><ForgotPassword /></IsUserLoggedIn>} />
        <Route path="/reset-password/:token" element={<IsUserLoggedIn><ResetPassword /></IsUserLoggedIn>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/data-grid/:actionId" element={<Protected><DataGrid /></Protected>} />
        <Route path="/edit-profile" element={<Protected><UpdateProfile /></Protected>} />
        <Route path="/create-content" element={<Protected><CreateContent /></Protected>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
