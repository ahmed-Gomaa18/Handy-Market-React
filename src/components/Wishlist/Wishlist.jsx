import React from 'react';
import { useState, useEffect } from "react"
import axios from "axios"
import WishlistCard from '../WishlistCard/WishlistCard';
import styles from './Wishlist.module.css';
import { useTranslation } from 'react-i18next'; 


const Wishlist = () => {
    const { t, i18n } = useTranslation();

    const [wishlistData, setWishlist] = useState([]);
    const [filteredData, setFiltered] = useState([]);

    const userToken = localStorage.getItem("user-token");

    // get wishlist
    const userWishlistUrl = "http://localhost:3000/api/v1/user/whishlist";
    // get all data 
    useEffect(() => {
        axios.get(userWishlistUrl, { headers: { "authorization": `Bearer ${userToken}` } }).then((data) => {
            setWishlist(data.data.wishListProducts);
            setFiltered(data.data.wishListProducts);
        });
    }, []);

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
                                    filteredData?.map((product) => (<WishlistCard key={product._id} {...product} />))
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
