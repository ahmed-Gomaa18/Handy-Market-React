import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const FilterStore = ({getFilterCategory}) => {

    const [categories, setCategories] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/category').then((data)=>{
            setCategories((categories)=>data.data.allCategories);
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

  return (
    <>
    
    <div className="col-md-12 col-sm-12 col-lg-2 d-flex flex-wrap justify-content-center aligin-items-stretch align-content-start border border-end rounded-1">
            

            {
                categories && categories.map((category)=>(
                    <div className="form-check m-2" key={category._id}>
                    <input className="form-check-input" type="checkbox" value={category._id} id={category._id} onChange={getFilterCategory} />
                    <label className="form-check-label" htmlFor={category._id}>
                        {category.name}
                    </label>
                    </div>
                ))
            }
            
              
    
    </div>
    </>
  )
}
