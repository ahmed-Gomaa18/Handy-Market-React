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
            <div className="col-md-12 col-sm-12 col-lg-2 d-flex flex-wrap justify-content-center aligin-items-stretch align-content-start border border-end rounded-1">
                {
                    categories && categories.map((category) => (
                        <div className="form-check m-2" key={category._id}>

                            <div className="col-md-4">
                                <h2 className="heading-section">
                                    <small>Checkboxes</small>
                                </h2>

                                <label className={styles.checkbox}><span>Success</span>
                                    <input type="checkbox" value={category._id} id={category._id} onChange={getFilterCategory} />
                                    <span className={styles.checkmark}></span>
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FilterStore;
