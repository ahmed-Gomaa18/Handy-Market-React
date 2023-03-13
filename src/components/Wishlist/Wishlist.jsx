import React from 'react';
import {useState,useEffect} from "react"
import axios from "axios"
import WishlistCard from '../WishlistCard/WishlistCard';

const Wishlist = () => {

    const [wishlistData,setWishlist]=useState([]);
    const [filteredData, setFiltered]=useState([]);

    const userToken=localStorage.getItem("user-token");

    // get wishlist
    const userWishlistUrl="http://localhost:3000/api/v1/user/whishlist";
    // get all data 
    useEffect(() => {  
        axios.get(userWishlistUrl,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
            setWishlist(data.data.wishListProducts);
            setFiltered(data.data.wishListProducts);
        });
    },[]);

    const getNotSloidProduct=(e)=>
    {    
        if(e.target.checked){
            let Arr= wishlistData.filter((product)=>product.number_of_items>0);
            setFiltered(Arr)
        }
        else{
            setFiltered(wishlistData)
        }
    }
    return (
            <>
            {
             <div className='d-flex flex-wrap ' >
                     <div  className="col-12 d-flex justify-content-between flex-wrap mt-3 mb-2 container">
                         <h1>Wishlist items</h1>
                         <div className='d-flex col-12  col-sm-3 align-items-center'>
                             <input className='checkbox me-2 col-4' type="checkbox" onChange={getNotSloidProduct} />
                             <label className='check-label col-8'>Hide sold out items</label>
                         </div>
                     </div>
                     <div className='d-flex flex-wrap justify-content-evenly mt-4'>
                         {   
                             filteredData?.map((product)=>(<WishlistCard  key={product._id} {...product}/>))
                         }
                    </div>
             </div>
           }
         </>
    );
}

export default Wishlist;
