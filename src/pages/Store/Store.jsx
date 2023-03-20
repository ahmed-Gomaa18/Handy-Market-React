import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import {FaClipboardList} from 'react-icons/fa'
import { MdPageview } from 'react-icons/md';
import Rating from '@mui/material/Rating';
import SearchStore from '../../components/SearchStore/SearchStore';
import FilterStore from '../../components/FilterStore/FilterStore';
import './Store.css';
import AddItemToCart from '../../components/AddItemToCart/AddItemToCart';
import { toast, ToastContainer } from 'react-toastify';
// import styles from './Store.module.css';

import { useTranslation } from 'react-i18next';

const image_url = "http://localhost:3000/api/v1/image";
const base_url = "http://localhost:3000/api/v1/product";

const Store = () => {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState([]);
    const [products, setProducts] = useState([]);

    const { t ,i18n } = useTranslation();

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

    // Add To Wishlist
    const addToWishList = (product_id)=>{
        axios.patch(`http://localhost:3000/api/v1/user/whishlist/${product_id}`, {}, {
            headers:{
                'Content-Type' : 'application/json',
                'authorization': `Bearer ${localStorage.getItem('user-token')}`
            }
        })
        .then((data)=>{
            console.log(data);
            toast.success('Add This Product to wishlist.', {
                position: toast.POSITION.TOP_RIGHT
            })
        }).catch((err)=>{
            console.log(err)
            toast.error('Faild while add Product to wishlist.', {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }

    // Add To Favorite
    const addToFavorite = (product_id)=>{
        axios.patch(`http://localhost:3000/api/v1/user/favorit/${product_id}`, {}, {
            headers:{
                'Content-Type' : 'application/json',
                'authorization': `Bearer ${localStorage.getItem('user-token')}`
            }
        })
        .then((data)=>{
            console.log(data);
            toast.success('Add This Product to Favorite.', {
                position: toast.POSITION.TOP_RIGHT
            })
        }).catch((err)=>{
            console.log(err)
            toast.error('Faild while add Product to Favorite.', {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }

    return (
        <>
            <div className='direct-url d-flex container p-3 align-items-center border-bottom'>
                <SearchStore setSearch={searchFun} />
            </div>

            <div className='d-flex flex-lg-row flex-column '>    
                <div className="col-md-12 col-sm-12 col-lg-2 d-flex flex-wrap justify-content-center aligin-items-stretch align-content-start border border-end rounded-1">
                    <FilterStore getFilterCategory={getFilterCategory} />
                </div>

                <div className="col-xxs-12 col-sm-12 col-md-12 col-lg-10 align-items-start d-flex ">
                    <div className='products-container col-12 d-flex flex-wrap justify-content-center p-5'>
                        {
                            products && products.map((product) => (
                                <div className="col-md-4 col-sm-12" key={product._id}>
                                    <div className="product-grid">
                                        <div className="product-image">
                                            <Link id='link' to="#" className="image d-flex align-items-center">
                                                {product.photos && <img className="pic-1" src={ image_url+product.photos[0] } alt='photoTwo'/>}
                                                {(product.photos[1] && <img className="pic-2" src={ image_url+product.photos[1] } alt='photoTwo'/>) || <img className="pic-2" src={ image_url+product.photos[0] } alt='photoTwo'/>}
                                            </Link>
                                            
                                            {product.discount ? <span className="product-discount-label">-{product.discount}%</span> : ''}

                                            <ul className="social"> 
                                                { localStorage.getItem('role') === 'Customer' && <li><Link id='link' data-tip="Add to Favorite" onClick={()=>addToFavorite(product._id)} > <i><BsFillSuitHeartFill/></i></Link> </li> }  
                                                { localStorage.getItem('role') === 'Customer' && <li><Link id='link' data-tip="Add to Wishlist" onClick={()=>addToWishList(product._id)}> <i><FaClipboardList/></i></Link> </li> }
                                                { localStorage.getItem('role') === 'Customer' && <li><Link id='link' to={`/product/${product._id}`} data-tip="Quick View"> <i><MdPageview/></i></Link> </li> }

                                            </ul>
                                        </div>
                                        
                                        <div className="product-content">
                                            <h3 className="title"><Link id='link' to="#">{product.product_name}</Link></h3>
                                            <span className="product-category"><Link to="#">Category:
                                                
                                                { i18n.language === 'en' ? product.categories_id[0]?.name_en :  product.categories_id[0]?.name_ar} { i18n.language === 'en' ? product.categories_id[1]? ', ' + product.categories_id[1].name_en : ''       : product.categories_id[1]? ', ' + product.categories_id[1].name_ar : ''}
                                                
                                                </Link></span>
                                            <div className="price">{product.price} LE</div>
                                            
                                            { localStorage.getItem('role') === 'Customer' && <Link className="add-to-cart" to="" data-tip="add-to-cart"> <AddItemToCart item={product} /> </Link> }
                                            
                                            {product.ratings_id.length >= 1 ? <Rating className='rating' name="read-only" value={calculateRating(product.ratings_id)} readOnly /> : <Rating className='rating' name="read-only" value='' readOnly />}   
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>

            <ToastContainer />


            
        </>
    )
}

export default Store;


