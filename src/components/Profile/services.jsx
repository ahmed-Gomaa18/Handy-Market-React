import React, { useState,useEffect } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../styles/services.style.css"
import { useNavigate } from "react-router-dom";

import axios from "axios"
const Services = () => {
  
    const navigate = useNavigate(); 
    const userId=localStorage.getItem("userId");
    const [allProducts,setProductsState]=useState(null);

    const ProductUrl="http://localhost:3000/api/v1/product/seller/true/";
    const sorcImag = 'http://localhost:3000/api/v1/image';
    
//authorization
     useEffect(() => {
      let userToken=localStorage.getItem("user-token")
      axios.get(`${ProductUrl}`,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
         var test=data.data.products;
         console.log(test)
         setProductsState(test);
    })},[]);
   const handleClick=(e,product)=>{
       navigate(`/update/${product._id}/${userId}`)
   }
  return (
          <div className='row justify-content-center justify-content-sm-evenly '>
            {
            allProducts?.map((product)=>{
              return ((product.photos[0] && <img key={product._id} className='col-sm-6 col-11 col-md-6 col-lg-4 mb-4 'alt='not has photo' src={`${sorcImag}${product.photos[0]}`} onClick={((e) =>handleClick(e,product))}></img>));
            })
          }
          </div>
  );
};

export default Services;