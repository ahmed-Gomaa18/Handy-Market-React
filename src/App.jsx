import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import { Store } from './pages/Store';
import { AddProduct } from './pages/AddProduct';

import Login from './pages/login';
import Register from './pages/register';
import SellerSignUp from './pages/sellerReg';
import Role from './pages/role';
import ForgetPassword from './pages/forgetPassword';
import CodeForgetPass from './pages/CodeForgetPass';
import ChangePassword from './pages/changePassowrd';


import Dashboard from "./admin/pages/Dashboard";
import ProductDetails from "./admin/pages/ProductDetails";
import ProductData from "./admin/pages/ProductData";
import BalanceData from "./admin/pages/BalanceData";
import UserData from "./admin/pages/UserData";
import Category from './admin/pages/Category';
import AllProductsdetails from './admin/pages/AllProductsdetails';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route path='store' element={<Store />} />
            <Route path='addProduct' element={<AddProduct />} />

            <Route path="login" element={< Login/>} />
            <Route path="register" element={< Register/>} />
            <Route path="sellerSignUp" element={< SellerSignUp/>} />
            <Route path="role" element={< Role/>} />
            <Route path="forgetPassword" element={< ForgetPassword/>} />
            <Route path="codeForgetPass" element={< CodeForgetPass/>} />
            <Route path="ChangePassword" element={< ChangePassword/>} />

            
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="dashboardProductDetails/:id" element={<ProductDetails/>}/>
            <Route path="dashboardProduct" element={<ProductData/>}/>
            <Route path="dashboardBalance" element={<BalanceData/>}/>
            <Route path="dashboardUsers" element={<UserData/>}/>
            <Route path="dashboardcategory" element={<Category/>}/>
            <Route path="dashboardALLProductDetails/:id" element={<AllProductsdetails/>}/>

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
