import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsList, BsHandbag, BsSearch, BsHeart } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../guard/Auth';
import CartIcon from './../components/CartIcon/CartIcon';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(auth.token);
  }

  const showNav = () => {
    if (active === 'navBar') {
      setActive('navBar activeNavbar')
    }
    else {
      setActive('navBar')
    }
  }

  const closeNav = () => {
    setActive('navBar')
  }

  return (
    <>
      <header className="header-top-strip py-2 d-none d-md-block">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-9">
              <p className="text-white mb-0">Free Shipping Over $100& Free Returns</p>
            </div>
            <div className="col-3">
              <p className="text-end mb-0">
                <Link className=" text-white">
                  <MdLanguage className="fs-4 me-1" />EN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className='navBarSection'>
        <header className='header flex'>
          <div className="container-xxl">
            <div className="row align-items-center justify-conten-between;">

              <div className="col-6">
                <div className='logoDiv'>
                  <Link to='/' className='logo'>
                    <h1>Handy Market</h1>
                  </Link>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <div className="nav-icons">
                    <BsSearch className="me-4" />
                    <CartIcon className="me-4" />
                    <BsHeart className="" />
                  </div>
                </div>
              </div>

              <div className="col-2 d-sm-block d-md-none">
                <div onClick={showNav} className="toggleNavbar">
                  <BsList className='icon' />
                </div>
              </div>
            </div>
          </div>
        </header>

        <header className='header flex justify-content-center sm-none'>
          <div className={active}>
            <ul className="navLists flex">

              <li className="navItem">
                <Link to="/" className="navLink">Home</Link>
              </li>

              <li className="navItem">
                <Link to="/" className="navLink">Packages</Link>
              </li>

              <li className="navItem">
                <Link to="/" className="navLink">Shop</Link>
              </li>

              <li className="navItem">
                <Link to="/seller" className="navLink">Store</Link>
              </li>

              <li className="navItem">
                <Link to="/dashboard" className="navLink">Dashboard</Link>
              </li>

              {!auth.token && (
                <li className="navItem">
                  <Link to="/auth/login" className="navLink">Login</Link>
                </li>
              )}

              {auth.token && (
                <li className="navItem">
                  <Link to="/" className="navLink" onClick={handleLogout}>Logout</Link>
                </li>
              )}
            </ul>

            <div onClick={closeNav} className="closeNavbar">
              <AiFillCloseCircle className='icon' />
            </div>
          </div>
        </header>
      </section>
    </>
  )
}

export default Navbar
