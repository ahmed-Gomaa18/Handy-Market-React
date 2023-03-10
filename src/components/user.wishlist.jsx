import React from 'react';
import {useState,useEffect} from "react"
import axios from "axios"
import RecipeReviewCard from "./cart"
import { BiSearch } from "react-icons/bi"
const Wishlist = () => {

    const [wishlistData ,setWishlist]=useState({Data:[]})
    const [notSolidproducts ,setNotsolidProducts]=useState({Data:[]})
    const [filteredData,setFiltered]=useState({Data:[]});
    const [searchTxt,setSearchTxt]=useState("");
    const [checkedSolid,setSolidChecked]=useState(false)

    const userToken=localStorage.getItem("user_token");

    // get all favorites
    const userWishlistUrl="http://localhost:3000/api/v1/user/whishlist";
    // get all data 
    useEffect(() => {  
        axios.get(userWishlistUrl,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
            console.log(data);
            let wishlist=data.data;
            setWishlist({Data:wishlist});
            setFiltered({Data:wishlist})
            setNotsolidProducts({Data:wishlist});
        });
    },[]);
   //  remove product  from Favorites list 
   const unFavorite=(id)=>{
        const FavoriteUrl="http://localhost:3000/api/v1/user/unfavorit/"; 
        axios.patch(`${FavoriteUrl}${id}`,null,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
            console.log(data.data.message);
   })}
   //  add product  to Favorites list 
   const favorite=(id)=>{
        const FavoriteUrl="http://localhost:3000/api/v1/user/favorit/"; 
        axios.patch(`${FavoriteUrl}${id}`,null,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
            console.log(data.data.message);
    })}
    //search
    const handleChange=(e)=>{
        setSearchTxt(e.target.value);
        let Arr= wishlistData.Data?.filter((product)=> product.product_name.toLowerCase().includes(e.target.value.toLowerCase()));
        if(Arr.length===0)
            setFiltered({Data:wishlistData.Data});
        else
            setFiltered({Data:Arr});
       
    }
    // filter solid items 
    // const getNotSloidProduct=(e)=>
    // {    
    //     setSolidChecked(e.target.checked);
    //     if(e.target.checked){
    //        let Arr= wishlistData.Data?.filter((product)=>product.number_of_items>0);
             
    //     }


        
    //     if(Arr.length===0)
    //     {
    //         setFiltered({Data:wishlistData.Data});
    //     }
    //     else{
    //         setFiltered({Data:Arr});
    //     }
    // }
    return (
            <>
            {
             (wishlistData.Data?.length && <div className='d-flex flex-wrap justify-content-center   justify-content-sm-start' >
                <div className='d-flex  flex-column col-12 justify-content-center ' >
                    <h1>Wishlist items</h1>
                    <div  className="col-12 d-flex justify-content-evenly flex-wrap ">
                        <div className='searchBlock col-12  col-sm-8 row '>
                            <input className='col-9  col-sm-10  col-lg-11 ' type="text" placeholder='Search your favorites' value={searchTxt}  onChange={handleChange} />
                            <button className='search-btn justify-content-end col-3 col-sm-2 col-lg-1'>
                                <BiSearch className='search-icon col-11' />
                            </button>
                        </div>
                        <div className='d-flex col-12  col-sm-3 align-items-center mt-3 mt-sm-0 '>
                            <input className='checkbox me-2 col-4' type="checkbox" value={checkedSolid} />
                            <label className='check-label col-8'>Hide sold out items</label>
                        </div> 
                    </div>   
                </div>
                {/* fav  */}
                     
                <div className='mt-4 row justify-content-center justify-content-sm-start'>
                    {
                       filteredData.Data?.map((product)=>(<RecipeReviewCard key={product._id} className=" me-4"  {...product} checked={false} favorite={favorite} unFavorite={unFavorite} />))
                    }
                </div>
                {/* <div className="alert alert-success"  role="alert">This is a success alert—check it out</div> */}
            </div>
            )
           }
         </>
    );
}

export default Wishlist;
