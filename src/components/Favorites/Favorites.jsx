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

                            <div className="row">
                           <div className="col-md-8">
                            <h4>{t("Favorite items")}</h4>
                            </div> 
                            <div className="col-md-4">

                            <div className="form-check">
                                <label className={styles.checkbox}><span>{t("Hide sold out items")}</span>
                                    <input type="checkbox" onChange={getNotSloidProduct} value={checkedSolid} />

                                    <span className={styles.checkmark}></span>
                                </label>
                            </div>
                            </div>

                            </div>

                            <div className='row'>
                                {filteredData &&
                                    filteredData?.map((product) => (

                                        <Product key={product._id} {...product}  unFavorite={unFavorite} />

                                    ))
                                }
                            </div>
                        </div>


                    </div>
                </div>
            }
        </div>
    );
}
export default Favorites;
