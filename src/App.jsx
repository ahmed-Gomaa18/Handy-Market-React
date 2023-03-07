import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
 import Dashboard from "./admin/pages/Dashboard";
import ProductDetails from "./admin/pages/ProductDetails";
import ProductData from "./admin/pages/ProductData";
import BalanceData from "./admin/pages/BalanceData";
import UserData from "./admin/pages/UserData";
import Category from './admin/pages/Category';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="dashboardProductDetails/:id" element={<ProductDetails/>}/>
            <Route path="dashboardProduct" element={<ProductData/>}/>
            <Route path="dashboardBalance" element={<BalanceData/>}/>
            <Route path="dashboardUsers" element={<UserData/>}/>
            <Route path="dashboardcategory" element={<Category/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
