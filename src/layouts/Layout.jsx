import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <>
      <ToastContainer />
      
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;