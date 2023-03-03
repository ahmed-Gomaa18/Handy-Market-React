import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';

const Slider = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    });
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active d-none" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" 
            className="d-none" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" 
            className="d-none" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
            <img src="images/slider/slide-1.jpg" className="d-block w-100" alt="slide-1" />
            <div className="carousel-caption home-slide1-content d-none d-md-block">
                <h2 className="title" data-aos="fade-down">Affectious gifts</h2>
                <h3 className="sub-title" data-aos="fade-up">
                    <img className="left-icon ls-is-cached lazyloaded" src="//cdn.shopify.com/s/files/1/0272/4937/7337/files/slide2-title-1_1024x1024.png?v=1613706191" alt="" />For friends &amp; family
                    <img className="right-icon ls-is-cached lazyloaded" src="//cdn.shopify.com/s/files/1/0272/4937/7337/files/slide-2-3_1024x1024.png?v=1613704587" alt="" />
                </h3>
                <div className="link"><Link to="/" data-aos="fade-up">Shop now</Link></div>    
            </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
            <img src="images/slider/slide-2.jpg" className="d-block w-100" alt="slide-2" />
            <div className="carousel-caption home-slide2-content d-none d-md-block">
                    <span className="bg"></span>
                    <span className="slide-border"></span>
                    <span className="icon">
                        <img className=" ls-is-cached lazyloaded" src="//cdn.shopify.com/s/files/1/0272/4937/7337/files/slide-1-1_1024x1024.png?v=1613704586" alt="" />
                    </span>
                    <h2 className="title" data-aos="fade-down">Handicraft Shop</h2>
                    <h3 className="sub-title">Just for you</h3>
                    <div className="link"><Link to="/" data-aos="fade-up">Shop now</Link></div>
            </div>
            </div>
            <div className="carousel-item">
            <img src="images/slider/slide-3.jpg" className="d-block w-100" alt="slide-3" />
            <div className="carousel-caption home-slide3-content d-none d-md-block">
                <span className="bg"></span>
                <span className="slide-border"></span>
                <span className="icon">
                    <img className=" ls-is-cached lazyloaded" src="//cdn.shopify.com/s/files/1/0272/4937/7337/files/slide-2-2_1024x1024.png?v=1613704587" alt="" />
                    <img className=" ls-is-cached lazyloaded" src="//cdn.shopify.com/s/files/1/0272/4937/7337/files/slide-2-3_1024x1024.png?v=1613704587" alt="" />
                </span>
                <h2 className="title" data-aos="fade-down">Newly arrived</h2>
                <h3 className="sub-title">Sale up to <br />10%</h3>
                <div className="link"><Link to="/" data-aos="fade-up">Shop now</Link></div>
            </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
};

export default Slider;