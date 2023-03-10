import React from 'react';
import { BiSearch } from "react-icons/bi"
import RecipeReviewCard from "./cart"
import {useState,useEffect} from "react"
import axios from "axios"
// css
import "../styles/user.favorites.style.css"
import NoFavORwish from "./noFavORwish"
import { Favorite } from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
const Favorites = () => {
   const checked=true;  
    const userToken=localStorage.getItem("user_token");
  
    const [favoritesData ,setFavorites]=useState({Data:[]})
    const [notSolidproducts ,setNotsolidProducts]=useState({Data:[]})
    const [filteredData,setFiltered]=useState({Data:[]});
    const [searchTxt,setSearchTxt]=useState("");
    const [checkedSolid,setSolidChecked]=useState(false)

   
   
    // get all favorites
    const userFavoriteUrl="http://localhost:3000/api/v1/user/favorites";
    useEffect(() => {  
        axios.get(userFavoriteUrl,{headers:{"Authorization":`Bearer ${userToken}`}}).then((data)=>{
            let favorites=data.data.favorites;
            setFavorites({Data:favorites});
            setFiltered({Data:favorites})
            console.log(data.data)
        }).catch(()=>{
            //navigate("/")
        })
    },[]); 

    //  remove  product  to Favorites list 
    const unFavorite=(id)=>{
    const unFavoriteUrl="http://localhost:3000/api/v1/user/unfavorit/"; 
    axios.patch(`${unFavoriteUrl}${id}`,null,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
        console.log(data.data.message);
        let allfavorites=[];
        if(data.status==200)
             allfavorites= favoritesData.Data.filter((product)=>{
               return product._id!==id;
           })
           setFavorites(({Data:allfavorites}))
    })
    }
   // add product in favorite list
  const favorite=(id)=>{
    const FavoriteUrl="http://localhost:3000/api/v1/user/favorit/"; 
    axios.patch(`${FavoriteUrl}${id}`,null,{headers:{"authorization":`Bearer ${userToken}`}}).then((data)=>{
        let allfavorites=[];
        if(data.status===200)
            console.log("added to favorite list successfully")
        setFavorites(({Data:allfavorites}))
    })
 }

 const handleChange=(e)=>{
    setSearchTxt(e.target.value);
    let Arr= notSolidproducts.Data?.filter((product)=>product.product_name.toLowerCase().includes(e.target.value.toLowerCase()));
    if(Arr.length===0)
        setFiltered({Data:notSolidproducts.Data});
    setFiltered({Data:Arr});
}
const getNotSloidProduct=(e)=>
    {    
        setSolidChecked(e.target.checked)
        //number_of_items wishlistData
        if(e.target.checked){
            console.log(e.target.checked)
            let Arr= favoritesData.Data?.filter((product)=>product.number_of_items>0);
            console.log(Arr)
            setNotsolidProducts({Data:Arr});
            setFiltered({Data:Arr})
        }
        else{
            setNotsolidProducts({Data:favoritesData.Data})
            setFiltered({Data:notSolidproducts.Data})
        }
    }
   
    return (
        <div>
        {
           <div className='d-flex flex-wrap justify-content-center justify-content-sm-start container' >
            <div className='d-flex  flex-column col-12 justify-content-center' >
                <h1>Favorite items</h1>
                <div  className="col-12 d-flex justify-content-evenly flex-wrap ">
                    <div className='searchBlock col-12  col-sm-8 row '>
                        <input className='col-9  col-sm-10  col-lg-11 ' type="text" placeholder='Search your favorites' value={searchTxt} onChange={handleChange} />
                        <button className='search-btn justify-content-end col-3 col-sm-2 col-lg-1'>
                            <BiSearch className='search-icon col-11' />
                        </button>
                    </div>
                    <div className='d-flex col-12  col-sm-3 align-items-center mt-3 mt-sm-0 '>
                        <input className='checkbox me-2 col-4' type="checkbox" />
                        <label className='check-label col-8'>Hide sold out items</label>
                    </div>
                </div>
            </div>                 
            <div className='mt-4 row justify-content-center justify-content-sm-start  '>
                {   
                  filteredData.Data?.map((product)=>(<RecipeReviewCard  key={product._id}  {...product} unFavorite={unFavorite} favorite={favorite} checked={checked}/>))
                }
           </div>
        </div>
       }
     </div>
    );
}
export default Favorites;
