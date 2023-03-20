import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';

import Store from './pages/Store/Store';
import AddProduct from './pages/AddProduct/AddProduct';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SellerSignUp from './pages/SellerReg/SellerReg';
import Role from './pages/Role/Role';
import ProductView from './pages/ProductView/ProductView';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import CodeForgetPass from './pages/CodeForgetPass/CodeForgetPass';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import { ContextProvider } from './guard/Auth';
import AdminAuth from './guard/AdminAuth';
import SellerAuth from './guard/SellerAuth';
import Dashboard from "./admin/pages/Dashboard";
import ProductDetails from "./admin/pages/ProductDetails";
import ProductData from "./admin/pages/ProductData";
import BalanceData from "./admin/pages/BalanceData";
import UserData from "./admin/pages/UserData";
import Category from './admin/pages/Category';
import AllProductsdetails from './admin/pages/AllProductsdetails';
import NotFound from './pages/NotFound/NotFound';

import UpdateService from './components/UpdateService/UpdateService';
import Favorites from './components/Favorites/Favorites';
import Wishlists from './components/Wishlist/Wishlist';

import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';


// For React react-toastify
import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages/Payment/Payment';

import Services from './components/SellerProducts/SellerProducts';
import SellerProducts from './components/SellerProducts/SellerProducts';
import SellerProfile from './pages/SellerProfile/SellerProfile';
import UpdateSellerProfile from './pages/UpdateSellerProfile/UpdateSellerProfile';
import UpdateCustomerprofile from './pages/UpdateCustomerProfile/UpdateCustomerProfile';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import CustomerAuth from './guard/CustomerAuth';

// For Localization
import "./i18n";

function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="sellerSignUp" element={<SellerSignUp />} />
              <Route path="role" element={< Role />} />
              <Route path="role/:register" element={<Role />} />
              <Route path="forgetPassword" element={< ForgetPassword />} />
              <Route path="codeForgetPass" element={< CodeForgetPass />} />
              <Route path="ChangePassword" element={< ChangePassword />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="store" element={<Store />} />
              <Route path="product/:prodId" element={<ProductView />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Customer Routes */}

            <Route element={<CustomerAuth />}>
              <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="CustomerProfile" element={<CustomerProfile />} />
                <Route path="editCustomerProfile" element={<UpdateCustomerprofile />} />
                <Route path="favorite" element={<Favorites />} />
                <Route path="wishlist" element={<Wishlists />} />
                <Route path="order" element={< Order />} />
                <Route path='order/payment' element={<Payment />} />
                <Route path="cart" element={<Cart />} />
                <Route path="store" element={<Store />} />
                <Route path="product/:prodId" element={<ProductView />} />
              </Route>

            </Route>

            {/* Admin Routes */}
            <Route element={<AdminAuth />}>
              <Route path="dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboardProductDetails/:id" element={<ProductDetails />} />
                <Route path="dashboardProduct" element={<ProductData />} />
                <Route path="dashboardBalance" element={<BalanceData />} />
                <Route path="users" element={<UserData />} />
                <Route path="dashboardcategory" element={<Category />} />
                <Route path="dashboardALLProductDetails/:id" element={<AllProductsdetails />} />
                <Route path="store" element={<Store />} />

              </Route>
            </Route>

            {/* Seller Routes */}
            <Route element={<SellerAuth />}>
              <Route path="seller" element={<Layout />}>
                <Route path="profile" element={<SellerProfile />} />
                <Route path="services" element={<SellerProducts />} />
                <Route path="editProfile" element={<UpdateSellerProfile />} />
                <Route path="update/:id/:userId" element={<UpdateService />} />
                <Route path='addProduct' element={<AddProduct />} />
                {/* <Route path="editProfile" element={<UpdateUserProfile/>}/> */}
              </Route>
            </Route>

            {/*  profile */}

            {/* <Route  path="/editProfile" element={<UpdateUserProfile/>}/>
               <Route exact path="/" element={<Profile/>}>
                  <Route path="/" element={<Services />} />
                  <Route  path="/update/:id/:userId" element={<UpdateService />} />
               </Route> 
                 <Route path="/" element={<UserProfile/>}>
                     <Route path="/favorite" element={<Favorites/>}/>
                     <Route path="/wishlist" element={<Wishlists/>}/>
                     <Route index  element={<NoFavORwish/>}/>
                </Route> */}

          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
