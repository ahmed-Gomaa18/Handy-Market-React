import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsList, BsSearch, BsHeart } from 'react-icons/bs';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { MdLanguage } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../../components/CartIcon/CartIcon';
import styles from './Navbar.module.css';
import axios from "axios";


import { useTranslation } from 'react-i18next';


const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState(`${styles.navBar}`);
  const [token, setToken] = useState(false);
  const userToken = localStorage.getItem('user-token');
  const userRole = localStorage.getItem('role');

  const navigate = useNavigate()

  // Add Language to localStorage By defualt english

  const logOut = ()=>{
    //localStorage.clear();
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('role');

    setToken(true)
    navigate('/')

  }


  const handleLogout = async() => {
    await axios.patch('https://handy-market-api.onrender.com/api/v1/auth/logOut', {}, {

      headers: {
        "authorization": `Bearer ${userToken}`
      }
    }).then(res => {
      logOut();

      
   }).catch(err => {
    console.log(err);
    if(err.response?.data.message == "Please Login again"){
      logOut()
    }

    })
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

  const detectDirection = () => {
    if (i18n.language == "en") {
      i18n.changeLanguage("ar");
      document.querySelector('#navbar').style.direction = "rtl";
      // document.querySelector('#add-product').style.direction = "rtl";
      // document.querySelector('#store').style.direction = "rtl";
    } else {
      i18n.changeLanguage("en");
      document.querySelector('#navbar').style.direction = "ltr";
      // document.querySelector('#add-product').style.direction = "ltr";
      // document.querySelector('#store').style.direction = "ltr";
    }
  }

  return (
    <>
      <header className={`py-2 d-none d-md-block ${styles.header_top_strip}`}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-9">
              {/* <p className="text-white mb-0">Free Shipping Over $100& Free Returns</p> */}

              <div className="col-3">
                <p className="text-end mb-0">
                  <Link className="text-white">
                    {i18n.language == "en" &&
                      <span> <MdLanguage onClick={detectDirection} className="fs-4 me-1" /> EN</span>
                    }
                    {
                      i18n.language == "ar" &&
                      <span> <MdLanguage onClick={detectDirection} className="fs-4 me-1" /> Ar </span>
                    }
                  </Link>
                </p>
              </div>

            </div>

          </div>
        </div>
      </header>
      <section id="navbar" className={styles.navBarSection}>
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

                <div className="d-flex justify-content-end">{/*align-content-center*/}
                  <div className="d-flex"> {/*align-items-center*/}
                    {userRole === 'Customer' && <CartIcon className="me-4" />}

                    {userToken && (

                      <>


                        {userRole !== 'Admin' &&
                          <Link to="/CustomerProfile">

                            <MdOutlineAccountCircle className="fs-3" />
                          </Link>
                        }

                        {userRole === 'Customer' && <Link to="/CustomerProfile" className={styles.navLink}>{t("Profile")}</Link>}
                        {userRole === 'Seller' && <Link to="/seller/profile" className={styles.navLink}>{t("Profile")}</Link>}
                      </>


                    )}

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
                <Link to="/" className={styles.navLink}> {t("Home")} </Link>
              </li>

              {userRole === "Seller" && (
                <li className={styles.navItem}>
                  <Link to="/seller/addProduct" className={styles.navLink}>{t("Add Product")}</Link>
                </li>

              )}

              <li className={styles.navItem}>
                <Link to="/store" className={styles.navLink}> {t("Store")} </Link>
              </li>

              {userRole === "Admin" && (
                <li className={styles.navItem}>
                  <Link to="/dashboard" className={styles.navLink}>{t("Dashboard")}</Link>
                </li>
              )}

              {!userToken && (
                <li className={styles.navItem}>

                  <Link to="/auth/login"  className={styles.navLink}>{t("Login")}</Link>

                </li>
              )}

              {userToken && (
                <li className={styles.navItem}>
                  <Link className={styles.navLink} onClick={() => handleLogout()}>{t("Logout")}</Link>
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
