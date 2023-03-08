import React from 'react';
import { useAuth } from './Auth';
import { Navigate, useLocation } from 'react-router-dom';

const SellerAuth = ({ children }) => {
  const auth =  useAuth();
  const location = useLocation();
  console.log('Location ', location);

  // Check User Token
  const userToken = localStorage.getItem('user-token');
  const userRole = localStorage.getItem('role');

  if (!auth.token || userToken === 'undefined') {
    return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
  } else if(userRole === 'Seller') {
    return children;
  }
};

export default SellerAuth;