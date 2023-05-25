import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Slider from '../../components/Slider/Slider';
import styles from './Home.module.css';


const Home = () => {
  const { t } = useTranslation();
  //const imgSrc = 'http://localhost:3000/api/v1/image';

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios.get("https://handy-market-api.onrender.com/api/v1/product")
    .then((data)=>{

      // console.log(data.data.slice(0, 4));

      setProducts(data.data.slice(0, 4));
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  return (
    <>
      <ToastContainer />
      <Slider />
      <section className="py-3">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="section-title text-center">
              <h3 className={styles.sub_title} data-aos="fade-up" >{t("Just for you")}</h3>
              <h2 className={`${styles.title} ${styles.title_icon_both}`} data-aos="fade-up">{t("Making & crafting")}</h2>
            </div>
          </div>

          <div className="row mb-4 align-items-center justify-content-between" >

            <div className="col-md-6 col-12 mb-5" data-aos="fade-right">
              <div className={styles.sale_banner1}>
                <div className={styles.inner}>
                  <img src="/images/sale-banner1.png" alt="sale-banner1" data-aos="zoom-in"/>
                  <span className={styles.title} data-aos="fade-up">Spring sale</span>
                  <h2 className={styles.sale_percen} data-aos="fade-up">
                    <span className={styles.number}>40</span> % <br /> off
                  </h2>
                  <Link to="/" className={styles.link} data-aos="fade-up">SHOP NOW</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12" data-aos="fade-left">
              <div className={styles.sale_banner2}>
                <div className={styles.inner} >
                  <div className={styles.image}>
                    <img className="w-100"  data-aos="zoom-in" src="/images/sale-banner2.jpg" alt="sale-banner2" />
                  </div>
                  <div className={`row justify-content-between mb-n3 ${styles.content}`}>
                    <div className="col-auto mb-3">
                      <h2 className={styles.sale_percent} data-aos="fade-up">{t("10% off")}</h2>
                      <span className={styles.text} >{t("YOUR NEXT PURCHASE")}</span>
                    </div>
                    <div className="col-auto mb-3">
                      <Link className={`btn-hover-dark ${styles.btn}`} to="/store"  data-aos="fade-up">{t("Shop Now")}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="py-3">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="section-title text-center">
              <h3 className={styles.sub_title} data-aos="fade-left">{t("Shop Now")}</h3>
              <h2 className={`${styles.title} ${styles.title_icon_both}`} data-aos="fade-right">{t("Shop our best sellers")}</h2>
            </div>
          </div>

            <div className="col d-flex flex-wrap justify-content-center mb-3">
              {products.length > 0 && products.map((product)=>(
                  <div key={product._id} className="product single-product m-2">
                    <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                      
                      <Link className="image image-wrap" to={`/product/${product._id}`}>
                        <img className={`responsive-image__image popup_cart_image w-100 ${styles.prod_img}`} src={`${product?.photos[0]}`} alt={product?.product_name} data-aos="zoom-in" />
                        <div className={styles.product_badges}>
                          { product.discount > 0 && <span className={styles.onsale}>-{product.discount}%</span> }
                        </div>
                      </Link>
                      
                      <Link className={`wishlist ${styles.add_to_wishlist}`} data-hint="Add to wishlist" to="/">
                        <BsHeart className="fs-3" />
                      </Link>
                    </div>
                    <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                      <h6 className="title popup_cart_title">
                        <Link to={`/product/${product._id}`}>{product.product_name}</Link>
                      </h6>
                      <span className={styles.price}>
                        <span id="product_current_price" className={`discounted-price ${styles.new}`}>
                          <span className="money">{product.price - (product.price * product.discount / 100)}LE</span>
                        </span>
                        <span className={`main-price discounted ${styles.old}`}>
                          <span className="money">{product.price}LE</span>
                        </span>
                        <div className="product-cart-action"></div>
                      </span>
                    </div>
                  </div>
                ))}

            </div>
          

        </div>
      </section>
    </>
  )
};

export default Home;