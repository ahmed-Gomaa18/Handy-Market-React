import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './FilterStore.module.css';

const FilterStore = ({ getFilterCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/category').then((data) => {
            setCategories(() => data.data.allCategories);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className="form-check m-2">

                <div className="col-md-4">
                    <h2 className="heading-section">
                        <small>Categories</small>
                    </h2>
                    {
                        categories && categories.map((category) => (
                            <label key={category._id} className={styles.checkbox}><span>{category.name}</span>
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
