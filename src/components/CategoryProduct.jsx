import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const CategoryProduct = ({ handelChange, formError }) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/category")
            .then((data) => {
                setCategory(() => data.data.allCategories)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="mb-2 mt-2">
                <label htmlFor="category" className="form-label fs-6 text-muted">Choose Categories:</label>
                <select className="form-select" name='categories_id' multiple data-live-search="true" onChange={handelChange} id='category'>
                    {
                        category && category.map((categ) => (
                            <option key={categ._id} value={categ._id}>{categ.name}</option>
                        ))
                    }
                </select>
                {formError && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formError}</div>}
            </div>
        </>
    )
}
