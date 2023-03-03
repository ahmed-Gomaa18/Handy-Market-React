import React from 'react';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';

const Home = () => {
  return (
    <>
      <Slider />

      <section className="py-3">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="section-title text-center">
              <h3 className="sub-title">Just for you</h3>
              <h2 className="title title-icon-both">Making & crafting</h2>
            </div>
          </div>
          <div className="row mb-4 align-items-center justify-content-between">
              <div className="col-md-6 col-12 mb-5">
                <div className="sale-banner1">
                  <div className="inner">
                    <img src="/images/sale-banner1.png" alt="sale-banner1" />
                    <span className="title">Spring sale</span>
                    <h2 className="sale-percent">
                      <span className="number">40</span> % <br /> off
                    </h2>
                    <Link to="/" className="link">SHOP NOW</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="sale-banner2">
                  <div className="inner">
                    <div className="image">
                      <img className="w-100" data-aos="zoom-in" src="/images/sale-banner2.jpg" alt="sale-banner2" />
                    </div>
                    <div className="content row justify-content-between mb-n3">
                        <div className="col-auto mb-3">
                          <h2 className="sale-percent">10% off</h2>
                          <span className="text">YOUR NEXT PURCHASE</span>
                        </div>
                        <div className="col-auto mb-3">
                          <Link className="btn btn-hover-dark" to="/">SHOP NOW</Link>
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
              <h3 className="sub-title">Shop now</h3>
              <h2 className="title title-icon-both">Shop our best sellers</h2>
            </div>
          </div>
          <div className="products row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 mb-5 position-relative">
            <div className="col">
              <div className="product single-product">
                <div className="product-thumb single-product__image d-flex align-items-center">
                  <Link className="image image-wrap" to={`/products/id`}>
                    <img className="responsive-image__image popup_cart_image w-100" src="/images/watch.jpg" tabindex="-1" alt="product name" />
                    <div className="product-badges">
                      <span className="onsale percent-count">-15%</span>
                    </div>
                  </Link>
                  <Link className="add-to-wishlist wishlist" data-hint="Add to wishlist" to="/">
                    <BsHeart className="fs-3" />
                  </Link>
                </div>
                <div class="product-info single-product__content text-center mt-3">
                  <h6 class="title popup_cart_title">
                    <Link to="/products/id">Dark Brown Leather Watch</Link>
                  </h6>
                  <span class="price">
                    <span id="product_current_price" class="discounted-price new">
                      <span class="money" data-currency-usd="$110.00">$110.00</span>
                    </span>
                    <span class="main-price discounted old">
                      <span class="money" data-currency-usd="$130.00">$130.00</span>
                    </span>
                      <div class="product-cart-action"></div>
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