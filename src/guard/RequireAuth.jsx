import React from 'react';
import { useAuth } from './Auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const auth =  useAuth();
  const location = useLocation();
  console.log('Location ', location);

  const userToken = localStorage.getItem('user-token');
  const userRole = localStorage.getItem('role');

  // FIXME: not go backward
  if (!auth.token && userToken === 'undefined') {
    return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
  } else if(userRole === 'Admin') {
    return <Outlet />;
  }
};

export default RequireAuth;