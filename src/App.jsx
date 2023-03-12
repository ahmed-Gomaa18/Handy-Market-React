import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';

import Store from './pages/Store/Store';
import AddProduct from './pages/AddProduct/AddProduct';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SellerSignUp from './pages/SellerReg/SellerReg';
import Role from './pages/Role/Role';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import CodeForgetPass from './pages/CodeForgetPass/CodeForgetPass';
import ChangePassword from './pages/ChangePassword/ChangePassword';
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
import NotFound from './pages/NotFound/NotFound';

import UpdateUserProfile from './pages/updateUserProfile';
import UpdateService from './components/updateService';
import Profile from './pages/profile';
import Services from './components/services';
import UserProfile from './pages/userProfile';
import Favorites from './components/user.favorites';
import Wishlists from './components/user.wishlist';
import NoFavORwish from './components/noFavORwish';

import Order from './pages/Order/Order';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart/Cart';



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
              <Route path="profile" element={<UserProfile />} />
              <Route path="favorite" element={<Favorites/>} />
              <Route path="wishlist" element={<Wishlists/>} />
              <Route path="order" element={< Order/>} />
              <Route path="wishlist" element={<Wishlist/>} />
              <Route path="cart" element={<Cart/>} />
              <Route path="store" element={<Store />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth/>}>
              <Route path="dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboardProductDetails/:id" element={<ProductDetails/>}/>
                <Route path="dashboardProduct" element={<ProductData/>}/>
                <Route path="dashboardBalance" element={<BalanceData/>}/>
                <Route path="users" element={<UserData/>}/>
                <Route path="dashboardcategory" element={<Category/>}/>
                <Route path="dashboardALLProductDetails/:id" element={<AllProductsdetails/>}/>
              </Route>
            </Route>

            {/* Seller Routes */}
            <Route element={<SellerAuth />}>
              <Route path="seller" element={<Layout />}>
                  <Route path='addProduct' element={<AddProduct />} /> 
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
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
