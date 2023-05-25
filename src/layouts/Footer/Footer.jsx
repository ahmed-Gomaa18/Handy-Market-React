import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { FiSend } from 'react-icons/fi';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
    <footer className="py-4">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 py-3" data-aos="fade-right">
            <div className="footer-top-data d-flex align-items-center">
              <h2 className="ms-3" ><FiSend className="fs-3"/> {t("Sign Up for Newsletter")}</h2>
            </div>
          </div>
          <div className="col-12 col-md-7 py-2" data-aos="fade-left">
            <div className="input-group">
              <input type="text" className="form-control py-1" placeholder={t("Your Email Address")} aria-label="Your Email Address" aria-describedby="basic-addon2" />
              <button
              className={`btn p-2 fs-5 ${styles.subscribe}`} 
              type="submit" name="subscribe" id="subscribe">{t("Subscribe")}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <footer className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 mb-5">
            <h4 className="mb-4 text-center" data-aos="fade-up">{t("Contact Us")}</h4>
            <div className="footer-links d-flex flex-wrap flex-column align-items-center">
              <ul className="d-flex flex-wrap align-items-center justify-content-md-between">
                <li className="hintT-top me-3" data-hint="Facebook" data-aos="fade-left">
                  <Link to="https://facebook.com">
                    <BsFacebook className="fs-3" />
                  </Link>
                </li>
                <li className="hintT-top me-3" data-hint="Twitter" data-aos="fade-left">
                  <Link to="https://twitter.com">
                    <BsTwitter className="fs-3" />
                  </Link>
                </li>
                <li className="hintT-top me-3" data-hint="INSTAGRAM" data-aos="fade-left">
                  <Link to="https://INSTAGRAM.com">
                    <BsInstagram className="fs-3" />
                  </Link>
                </li>
                <li className="hintT-top me-3" data-hint="youtube" data-aos="fade-left">
                  <Link to="https://youtube.com">
                    <BsYoutube className="fs-3" />
                  </Link>
                </li>
                <li className="hintT-top me-3" data-hint="gmail" data-aos="fade-left">
                  <Link to="https://gmail.com">
                    <GrMail className="fs-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4 col-md-3">
            <h4 className="mb-4" data-aos="fade-left">{t("Information")}</h4>
            <div className="footer-links d-flex flex-column">
              <Link className="py-2 mb-1" data-aos="fade-up">{t("Privacy Policy")}</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">{t("Shipping Policy")}</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">{t("Terms & Conditions")}</Link>
            </div>
          </div>
          <div className="col-4 col-md-2 col-lg-3">
            <h4 className="mb-4" data-aos="fade-left">{t("Account")}</h4>
            <div className="footer-links d-flex flex-column">
              <Link className="py-2 mb-1" data-aos="fade-up">{t("About us")}</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">{t("Support")}</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">{t("FAQs")}</Link>
            </div>
          </div>
          <div className="col-4 col-md-3 col-lg-3">
            <h4 className="mb-4" data-aos="fade-left">{t("Quick Links")}</h4>
            <div className="footer-links d-flex flex-column">

              <Link className="py-2 mb-1" data-aos="fade-up">Baskets</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">Bags & Clutches</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">Cushions</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">Dresses</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">Mats & Rugs</Link>
              <Link className="py-2 mb-1" data-aos="fade-up">Seats & Banquettes</Link>

            </div>
          </div>
        </div>
      </div>
    </footer>

    <footer className="py-3">
      <div className="container">
        <div className="col-12">
          <div className="text-center">
            <p className="copyright">
              © {new Date().getFullYear()} Handy Market. {t("All Rights Reserved")} | <a href="mailto:handymarketshop@gmail.com">handymarketshop@gmail.com</a></p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
};

export default Footer;

// data-aos-duration="4000"