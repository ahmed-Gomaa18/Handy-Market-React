import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';   
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {MdAddShoppingCart} from "react-icons/md";
import "../styles/user.favorites.style.css"
import {Patch} from "react-axios"
import {useState} from "react"
import axios from "axios"

const ExpandMore = styled((props) =>{
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props){

  

   const {product_name,price,description,photos,_id,unFavorite,favorite,checked}=props;
   const sorcImag = 'http://localhost:3000/api/v1/image'
   
  const [checkboxState,setCheckboxState]=useState(checked)

   function handleChange(e){
     console.log(e.target.checked)
     setCheckboxState(e.target.checked)
     if(!e.target.checked)
        unFavorite(_id)
    else{
       favorite(_id)
      }
   }
   
    let img="";
   if(photos&&photos.length>0)
    img=photos[0]
  return (
    <Card key={_id} sx={{ maxWidth: 280 }} className="cart me-sm-4 mb-4 row justify-content-center justify-content-sm-start">
      <CardHeader
        title={product_name}
      />
      <CardMedia
        component="img"
        height="150"
        image={`${sorcImag}${img}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <MdAddShoppingCart/>
          </IconButton>
          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite className='custom-checkbox'/>} checked={checkboxState} onChange={handleChange} />
        <ExpandMore>
            <span className='price fs-4'>$ {price}</span>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}


// const unFavorite=(id)=>{
//   const userToken=localStorage.getItem("user_token");
//   const FavoriteUrl="http://localhost:3000/api/v1/user/unfavorit/"; 
//   axios.patch(`${FavoriteUrl}${id}`,{headers:{"Authorization":`Bearer ${userToken}`}}).then((data)=>{
//       console.log(data);
//       // let favorites=data.data.favorites;
//       // console.log(favorites)
//       // setFavorites({Data:favorites});
//   })
// }
