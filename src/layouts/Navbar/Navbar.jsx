import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsList, BsSearch, BsHeart } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../guard/Auth';
import CartIcon from '../../components/CartIcon/CartIcon';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [active, setActive] = useState(`${styles.navBar}`);
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(auth.token);
  }

  const showNav = () => {
    if (active === `${styles.navBar}`) {
      setActive(`${styles.navBar} ${styles.activeNavbar}`)
    }
    else {
      setActive(`${styles.navBar}`)
    }
  }

  const closeNav = () => {
    setActive(`${styles.navBar}`)
  }

  return (
    <>
      <header className={`py-2 d-none d-md-block ${styles.header_top_strip}`}>
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
      <section className={styles.navBarSection}>
        <header className={styles.header}>
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-6">
                <div className={styles.logoDiv}>
                  <Link to='/' className="d-flex align-items-center">
                      <img className={styles.logo_img} src="/images/logo_img.png" alt="logo" /> <span className={`d-none d-sm-block ${styles.title}`}>Handy Market</span>
                  </Link>
                </div>
              </div>

              <div className="col-5">
                <div className="d-flex justify-content-end">
                  <div className="d-flex">
                    <BsSearch className="me-4" />

                    {localStorage.getItem('role') === 'Customer' && <CartIcon className="me-4" />}
                    
                    <BsHeart />
                  </div>
                </div>
              </div>

              <div className="col-1 d-sm-block d-md-none">
                <div onClick={showNav} className={styles.toggleNavbar}>
                  <BsList className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <header className={`d-flex justify-content-center sm-none p-0 py-md-2 ${styles.header}`}>
          <div className={active}>
            <ul className={`d-flex ${styles.navLists}`}>

              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>Home</Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>Packages</Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/seller/addProduct" className={styles.navLink}>Add Product</Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/store" className={styles.navLink}>Store</Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              </li>

              {!auth.token && (
                <li className={styles.navItem}>
                  <Link to="/auth/login" className={styles.navLink}>Login</Link>
                </li>
              )}

              {auth.token && (
                <li className={styles.navItem}>
                  <Link to="/" className={styles.navLink} onClick={handleLogout}>Logout</Link>
                </li>
              )}
            </ul>

            <div onClick={closeNav} className={`${styles.icon} ${styles.close_icon}`}>
              <AiFillCloseCircle className="fs-2" />
            </div>
          </div>
        </header>
      </section>
    </>
  )
}

export default Navbar
