import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import WishlistCard from '../WishlistCard/WishlistCard';
import styles from './Wishlist.module.css';

import { ToastContainer, toast  } from 'react-toastify';

const Wishlist = () => {
    const { t, i18n } = useTranslation();

    const [wishlistData, setWishlist] = useState([]);
    const [filteredData, setFiltered] = useState([]);

    const userToken = localStorage.getItem("user-token");

    // get wishlist
    const userWishlistUrl = "https://handy-market-api.onrender.com/api/v1/user/whishlist";
    // get all data 
    useEffect(() => {
        axios.get(userWishlistUrl, { headers: { "authorization": `Bearer ${userToken}` } }).then((data) => {
            setWishlist(data.data.wishListProducts);
            setFiltered(data.data.wishListProducts);
        });
    }, []);


    const unWishlist = (id) => {
        const unWhishlistUrl = "https://handy-market-api.onrender.com/api/v1/user/unWhishlist/";

        axios.patch(`${unWhishlistUrl}${id}`, null, { headers: { "authorization": `Bearer ${userToken}` } })
            .then((data) => {
                let allWishlist = [];
                if (data.status === 200)

                allWishlist = wishlistData.filter((product) => {
                        return product._id !== id;
                })
                const allwishlistFiltered = filteredData.filter((product) => {
                    return product._id !== id;
                })
                setWishlist(allWishlist);
                setFiltered(allwishlistFiltered);
                
                toast.success('Remove this product from Wishlist Successfully.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                })
            
            })
    }
    
    const getNotSloidProduct = (e) => {
        if (e.target.checked) {
            let Arr = wishlistData.filter((product) => product.number_of_items > 0);
            setFiltered(Arr)
        }
        else {
            setFiltered(wishlistData)
        }
    }
    return (
        <>
            <ToastContainer />
            {
                <div className='container-fluid ' >
                    <div className="row">

                        <div className="col-md-12 mt-3">

                        <div className="row">
                           <div className="col-md-8">
                           <h4>{t("Wishlist items") } </h4>
                            </div> 
                            <div className="col-md-4">


                            <div className="form-check">
                            <label className={styles.checkbox}><span>{t("Hide sold out items")}</span>
                                    <input type="checkbox" onChange={getNotSloidProduct} />

                                    <span className={styles.checkmark}></span>
                                </label>
                            </div>
                            </div>

                            </div>

                
                            <div className='row'>
                                {
                                    filteredData?.map((product) => (<WishlistCard key={product._id} {...product}  unWishlist={unWishlist} />))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Wishlist;
