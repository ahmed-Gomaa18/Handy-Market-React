import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import styles from './Slider.module.css';

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
                    <div className={`home-slide1-content carousel-caption d-none d-md-block ${styles.caption}`}>
                        <h2 className={styles.title} data-aos="fade-down">Affectious gifts</h2>
                        <h3 className={styles.sub_title} data-aos="fade-up">
                            <img src="images/title-decor-left.png" alt="decor-left" />For friends &amp; family
                            <img src="images/title-decor-right.png" alt="decor-right" />
                        </h3>
                        <div className={styles.link}><Link to="/" data-aos="fade-up">Shop now</Link></div>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src="images/slider/slide-2.jpg" className="d-block w-100" alt="slide-2" />
                    <div className={`home-slide2-content carousel-caption d-none d-md-block ${styles.caption}`}>
                        <span className="bg"></span>
                        <span className="slide-border"></span>
                        <span className="icon">
                            <img src="images/slider/bard.png" alt="bard" />
                        </span>
                        <h2 className={styles.title} data-aos="fade-down">Handicraft Shop</h2>
                        <h3 className={styles.sub_title}>Just for you</h3>
                        <div className={styles.link}><Link to="/" data-aos="fade-up">Shop now</Link></div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="images/slider/slide-3.jpg" className="d-block w-100" alt="slide-3" />
                    <div className={`home-slide2-content carousel-caption d-none d-md-block ${styles.caption}`}>
                        <span className="bg"></span>
                        <span className="slide-border"></span>
                        <span className="icon">
                            <img src="images/title-decor-left.png" alt="decor-left" />
                            <img src="images/title-decor-right.png" alt="decor-right" />
                        </span>
                        <h2 className={styles.title} data-aos="fade-down">Newly arrived</h2>
                        <h3 className={styles.sub_title}>Sale up to <br />10%</h3>
                        <div className={styles.link}><Link to="/" data-aos="fade-up">Shop now</Link></div>
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