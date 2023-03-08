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
       

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
