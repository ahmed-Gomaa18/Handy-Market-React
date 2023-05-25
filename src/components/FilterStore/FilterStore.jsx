import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './FilterStore.module.css';

import { useTranslation } from 'react-i18next';

const FilterStore = ({ getFilterCategory }) => {

    const { t ,i18n } = useTranslation();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://handy-market-api.onrender.com/api/v1/category').then((data) => {
            setCategories(() => data.data.allCategories);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className="form-check m-2">

                <div className="col-md-4">
                    <h3 className="heading-section" data-aos="fade-left">
                        <small>{t("Categories")}</small>
                    </h3>
                    {
                        categories && categories.map((category) => (

                            i18n.language === "en" ? 
                            <label key={category._id} className={styles.checkbox} data-aos="fade-right"><span>{category.name_en}</span>
                                <input type="checkbox" value={category._id} id={category._id} onChange={getFilterCategory} />
                                <span className={styles.checkmark}></span>
                            </label>
                            :
                            <label key={category._id} className={styles.checkbox} data-aos="fade-right"><span>{category.name_ar}</span>
                                <input type="checkbox" value={category._id} id={category._id} onChange={getFilterCategory} />
                                <span className={styles.checkmark}></span>
                            </label>
                            
                        ))
                    }
                    

                </div>
            </div>

        </>
    )
}

export default FilterStore;
