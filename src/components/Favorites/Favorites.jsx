import React, { useState, useEffect } from 'react';
import axios from "axios";
import Product from '../Product/Product';
import styles from './Favorites.module.css';

import { useTranslation } from 'react-i18next';
const Favorites = () => {
    const { t, i18n } = useTranslation();

    const userToken = localStorage.getItem("user-token");

    const [favoritesData, setFavorites] = useState([])
    const [filteredData, setFiltered] = useState([])
    const [checkedSolid, setSolidChecked] = useState(false)

    // get all favorites
    const userFavoriteUrl = "http://localhost:3000/api/v1/user/favorit";
    useEffect(() => {
        axios.get(userFavoriteUrl, { headers: { "Authorization": `Bearer ${userToken}` } }).then((data) => {
            let favorites = data.data.favoriteProducts;
            setFavorites(favorites);
            setFiltered(favorites);
        })
    }, []);

    //  remove  product  to Favorites list 
    const unFavorite = (id) => {
        const unFavoriteUrl = "http://localhost:3000/api/v1/user/unfavorit/";
        axios.patch(`${unFavoriteUrl}${id}`, null, { headers: { "authorization": `Bearer ${userToken}` } })
            .then((data) => {
                console.log(data.data.message);
                let allfavorites = [];
                if (data.status === 200)

                    allfavorites = favoritesData.filter((product) => {
                        return product._id !== id;
                    })
                const allfavoritesFiltered = filteredData.filter((product) => {
                    return product._id !== id;
                })
                setFavorites(allfavorites);
                setFiltered(allfavoritesFiltered);
            })
    }
    const getNotSloidProduct = (e) => {
        setSolidChecked(e.target.checked)
        if (e.target.checked) {
            let Arr = favoritesData.filter((product) => product.number_of_items > 0);
            setFiltered(Arr)
        }
        else {
            setFiltered(favoritesData)
        }
    }
    return (
        <div>
            {
                <div className='container-fluid ' >
                    <div className="row mt-3">
                        <div className="col-md-12">

                            <h4>{t("Favorite items")}</h4>
                            {/* <div className='d-flex col-12  col-sm-3 align-items-center'>
                                <input className='checkbox me-2 col-4' type="checkbox" onChange={getNotSloidProduct} value={checkedSolid} />
                                <label className='check-label col-8'>Hide sold out items</label>
                            </div> */}
                            <div className="form-check">
                        <label className={styles.checkbox}><span>{t("Hide sold out items")}</span>
                                    <input type="checkbox"  onChange={getNotSloidProduct} value={checkedSolid}/>
                                    <span className={styles.checkmark}></span>
                                </label>
                        </div>
                        </div>
                        <div className='d-flex flex-wrap justify-content-evenly mt-4'>
                            {
                                filteredData?.map((product) => (
                                    <Product key={product._id} {...product} unFavorite={unFavorite} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default Favorites;
