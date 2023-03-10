import React from 'react';
import Slider from '../../components/Slider/Slider';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <Slider />
      <section className="py-3">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="section-title text-center">
              <h3 className={styles.sub_title}>Just for you</h3>
              <h2 className={`${styles.title} ${styles.title_icon_both}`}>Making & crafting</h2>
            </div>
          </div>
          <div className="row mb-4 align-items-center justify-content-between">
            <div className="col-md-6 col-12 mb-5">
              <div className={styles.sale_banner1}>
                <div className={styles.inner}>
                  <img src="/images/sale-banner1.png" alt="sale-banner1" />
                  <span className={styles.title}>Spring sale</span>
                  <h2 className={styles.sale_percen}>
                    <span className={styles.number}>40</span> % <br /> off
                  </h2>
                  <Link to="/" className={styles.link}>SHOP NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className={styles.sale_banner2}>
                <div className={styles.inner}>
                  <div className={styles.image}>
                    <img className="w-100" data-aos="zoom-in" src="/images/sale-banner2.jpg" alt="sale-banner2" />
                  </div>
                  <div className={`row justify-content-between mb-n3 ${styles.content}`}>
                    <div className="col-auto mb-3">
                      <h2 className={styles.sale_percent}>10% off</h2>
                      <span className={styles.text}>YOUR NEXT PURCHASE</span>
                    </div>
                    <div className="col-auto mb-3">
                      <Link className={`btn-hover-dark ${styles.btn}`} to="/">SHOP NOW</Link>
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
              <h3 className={styles.sub_title}>Shop now</h3>
              <h2 className={`${styles.title} ${styles.title_icon_both}`}>Shop our best sellers</h2>
            </div>
          </div>
          <div className="products row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 mb-5 d-flex justify-content-center position-relative">
            <div className="col d-flex justify-content-center mb-3">
              <div className="product single-product">
                <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                  <Link className="image image-wrap" to={`/products/id`}>
                    <img className="responsive-image__image popup_cart_image w-100" src="/images/watch.jpg" tabIndex="-1" alt="product name" />
                    <div className={styles.product_badges}>
                      <span className={styles.onsale}>-15%</span>
                    </div>
                  </Link>
                  <Link className={styles.add_to_wishlist} data-hint="Add to wishlist" to="/">
                    <BsHeart className="fs-3" />
                  </Link>
                </div>
                <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                  <h6>
                    <Link to="/products/id" className={styles.product_title}>Dark Brown Leather Watch</Link>
                  </h6>
                  <span className={styles.price}>
                    <span id="product_current_price" className={styles.new}>
                      <span className="money" data-currency-usd="$110.00">$110.00</span>
                    </span>
                    <span className={styles.old}>
                      <span className="money" data-currency-usd="$130.00">$130.00</span>
                    </span>
                    <div className="product-cart-action"></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center mb-3">
              <div className="product single-product">
                <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                  <Link className="image image-wrap" to={`/products/id`}>
                    <img className="responsive-image__image popup_cart_image w-100" src="/images/watch.jpg" tabIndex="-1" alt="product name" />
                    <div className={styles.product_badges}>
                      <span className={styles.onsale}>-15%</span>
                    </div>
                  </Link>
                  <Link className={styles.add_to_wishlist} data-hint="Add to wishlist" to="/">
                    <BsHeart className="fs-3" />
                  </Link>
                </div>
                <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                  <h6>
                    <Link to="/products/id" className={styles.product_title}>Dark Brown Leather Watch</Link>
                  </h6>
                  <span className={styles.price}>
                    <span id="product_current_price" className={styles.new}>
                      <span className="money" data-currency-usd="$110.00">$110.00</span>
                    </span>
                    <span className={styles.old}>
                      <span className="money" data-currency-usd="$130.00">$130.00</span>
                    </span>
                    <div className="product-cart-action"></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center mb-3">
              <div className="product single-product">
                <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                  <Link className="image image-wrap" to={`/products/id`}>
                    <img className="responsive-image__image popup_cart_image w-100" src="/images/watch.jpg" tabIndex="-1" alt="product name" />
                    <div className={styles.product_badges}>
                      <span className={styles.onsale}>-15%</span>
                    </div>
                  </Link>
                  <Link className={styles.add_to_wishlist} data-hint="Add to wishlist" to="/">
                    <BsHeart className="fs-3" />
                  </Link>
                </div>
                <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                  <h6>
                    <Link to="/products/id" className={styles.product_title}>Dark Brown Leather Watch</Link>
                  </h6>
                  <span className={styles.price}>
                    <span id="product_current_price" className={styles.new}>
                      <span className="money" data-currency-usd="$110.00">$110.00</span>
                    </span>
                    <span className={styles.old}>
                      <span className="money" data-currency-usd="$130.00">$130.00</span>
                    </span>
                    <div className="product-cart-action"></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center mb-3">
              <div className="product single-product">
                <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                  <Link className="image image-wrap" to={`/products/id`}>
                    <img className="responsive-image__image popup_cart_image w-100" src="/images/watch.jpg" tabIndex="-1" alt="product name" />
                    <div className={styles.product_badges}>
                      <span className={styles.onsale}>-15%</span>
                    </div>
                  </Link>
                  <Link className={styles.add_to_wishlist} data-hint="Add to wishlist" to="/">
                    <BsHeart className="fs-3" />
                  </Link>
                </div>
                <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                  <h6>
                    <Link to="/products/id" className={styles.product_title}>Dark Brown Leather Watch</Link>
                  </h6>
                  <span className={styles.price}>
                    <span id="product_current_price" className={styles.new}>
                      <span className="money" data-currency-usd="$110.00">$110.00</span>
                    </span>
                    <span className={styles.old}>
                      <span className="money" data-currency-usd="$130.00">$130.00</span>
                    </span>
                    <div className="product-cart-action"></div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Home;