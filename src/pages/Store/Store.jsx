import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsFillSuitHeartFill, BsFillCartFill } from 'react-icons/bs';
import { MdPageview } from 'react-icons/md';
import Rating from '@mui/material/Rating';
import SearchStore from '../../components/SearchStore/SearchStore';
import FilterStore from '../../components/FilterStore/FilterStore';
import styles from './Store.module.css';

const base_url = "http://localhost:3000/api/v1/product";

const Store = () => {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState([]);
    const [products, setProducts] = useState([]);

    const getFilterCategory = (e) => {
        if (e.target.checked) {
            const state = [...filterCategory, e.target.value];
            setFilterCategory(state);
        } else {
            const state = filterCategory.filter((val) => val.toString() !== e.target.value.toString());
            setFilterCategory(state);
        }
    }

    useEffect(() => {
        axios.get(`${base_url}?search=${search}&categories=${filterCategory}`)
            .then((data) => {
                setProducts(() => data.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [search, filterCategory])

    const searchFun = (val) => {
        setSearch(() => val)
    }

    const calculateRating = (ratings) => {
        let containerNum = 0;
        ratings.forEach((rate) => {
            containerNum += rate.rating;
        })
        return (Math.round(containerNum / ratings.length))
    }
    var exam = [{ rating: 4 }, { rating: 1 }, { rating: 5 }]
    console.log(calculateRating(exam))
    return (
        <>
            <div className='direct-url d-flex container p-3 align-items-center border-bottom'>
                <h4 className='col-3 fs-5'>Home &gt; Product</h4>
                <Link to="/seller/addProduct">Add Product</Link>
                <SearchStore setSearch={searchFun} />
            </div>
            <div className='d-flex flex-lg-row flex-column '>
                <FilterStore getFilterCategory={getFilterCategory} />
                <div className="col-xxs-12 col-sm-12 col-md-12 col-lg-10 align-items-center d-flex ">
                    <div className='products-container col-12 d-flex flex-wrap justify-content-center p-5'>
                        {
                            products && products.map((product) => (

                                <div className="col-md-3 col-sm-12" key={product._id}>
                                    <div className={styles.product_grid}>
                                        {console.log(product.ratings_id[0]?.rating)}
                                        <div className={styles.product_image}>
                                            <Link id='link' to="#" className={`d-flex align-items-center ${styles.product_image}`}>
                                                {product.photos && <img className={styles.pic_1} src={product.photos[0]} alt='photoTwo' />}
                                                {(product.photos[1] && <img className={styles.pic_2} src={product.photos[1]} alt='photoTwo' />) || <img className="pic_2" src={product.photos[0]} alt='photoTwo' />}
                                            </Link>
                                            {product.discount ? <span className="product-discount-label">-{product.discount}%</span> : ''}
                                            <ul className={styles.social}>
                                                <li><Link id='link' to="/" data-tip="Add to Wishlist"> <i><BsFillSuitHeartFill /></i></Link> </li>
                                                <li><Link id='link' to="#" data-tip="Quick View"> <i><MdPageview /></i></Link> </li>
                                            </ul>
                                        </div>

                                        <div className={styles.product_content}>
                                            <h3 className={styles.title}><Link id='link' to="#">{product.product_name}</Link></h3>
                                            {/* <span className={styles.product_category}><Link to="#">Category: {product.categories_id[0].name} {product.categories_id[1] ? ', ' + product.categories_id[1].name : ''}</Link></span> */}
                                            <div className={styles.price}>${product.price}</div>
                                            <Link className={styles.add_to_cart} to="/cart" data-tip="add-to-cart">< BsFillCartFill /> ADD TO CART </Link>
                                            {product.ratings_id.length >= 1 ? <Rating className={styles.rating} name="read-only" value={calculateRating(product.ratings_id)} readOnly /> : <Rating className={styles.rating} name="read-only" value='' readOnly />}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Store;