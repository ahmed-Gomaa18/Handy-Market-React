import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './CategoryProduct.module.css';

export const CategoryProduct = ({ handelChange, formError }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/category")
            .then((data) => {
                setCategories(() => data.data.allCategories)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="mb-2 mt-2">
                <label htmlFor="categories" className='form-label my-2 fs-5'>Choose Categories</label>
                <div className="input_control d-flex flex-row flex-wrap mb-2 mt-2">
                    {categories && categories.map((category) => (
                        <div className="col-4" key={category._id}>
                            <label htmlFor={category._id} className={styles.checkbox}>
                                <span>{category.name}</span>
                                <input type="checkbox" name='categories_id' value={category._id} id={category._id} onChange={handelChange} />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}
