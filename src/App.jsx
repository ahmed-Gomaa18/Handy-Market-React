import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';

import Store from './pages/Store';
import AddProduct from './pages/AddProduct';
import Login from './pages/login';
import Register from './pages/register';
import SellerSignUp from './pages/sellerReg';
import Role from './pages/role';
import ForgetPassword from './pages/forgetPassword';
import CodeForgetPass from './pages/CodeForgetPass';
import ChangePassword from './pages/changePassowrd';
import { ContextProvider } from './guard/Auth';
import RequireAuth from './guard/RequireAuth';
import SellerAuth from './guard/SellerAuth';
import Dashboard from "./admin/pages/Dashboard";
import ProductDetails from "./admin/pages/ProductDetails";
import ProductData from "./admin/pages/ProductData";
import BalanceData from "./admin/pages/BalanceData";
import UserData from "./admin/pages/UserData";
import Category from './admin/pages/Category';
import AllProductsdetails from './admin/pages/AllProductsdetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="register" element={<Register/>} />
              <Route path="sellerSignUp" element={<SellerSignUp/>} />
              <Route path="role" element={< Role/>} />
              <Route path="role/:register" element={<Role/>} />
              <Route path="forgetPassword" element={< ForgetPassword/>} />
              <Route path="codeForgetPass" element={< CodeForgetPass/>} />
              <Route path="ChangePassword" element={< ChangePassword/>} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth/>}>
              <Route path="dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboardProductDetails/:id" element={<ProductDetails/>}/>
                <Route path="dashboardProduct" element={<ProductData/>}/>
                <Route path="dashboardBalance" element={<BalanceData/>}/>
                <Route path="dashboardUsers" element={<UserData/>}/>
                <Route path="dashboardcategory" element={<Category/>}/>
                <Route path="dashboardALLProductDetails/:id" element={<AllProductsdetails/>}/>
              </Route>
            </Route>

            {/* Seller Routes */}
            <Route element={<SellerAuth />}>
              <Route path="seller" element={<Layout />}>
                  <Route index element={<Store />} />
                  <Route path='addProduct' element={<AddProduct />} /> 
              </Route>
            </Route>
            
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
