import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminAuth = ({ children }) => {
  const location = useLocation();

  const userToken = localStorage.getItem('user-token');
  const userRole = localStorage.getItem('role');

  if (userToken === 'undefined' && userRole === 'undefined') {
    return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
  } else if(userRole === 'Admin') {
    return <Outlet />;
  }
};

export default AdminAuth;