import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

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

export default function WishlistCard(props){

   const {product_name,price,description,photos,discount,_id}=props;
   const sorcImag = 'http://localhost:3000/api/v1/image'
   
    let img="";
   if(photos&&photos.length>0)
    img=photos[0]
  return (
    // <Card key={_id} sx={{maxWidth:250 }} className="cart me-1 mb-4 bg-warning">
    //   <CardHeader
    //     title={product_name}
    //   />
    //   <CardMedia
    //     component="img"
    //     height="150"
    //     image={`${sorcImag}${img}`}
    //     alt="Paella dish"
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {description}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //       <IconButton aria-label="add to cart">
    //       <MdAddShoppingCart/>
    //       </IconButton>
    //     <ExpandMore>
    //         <span className='price fs-4'>$ {price}</span>
    //     </ExpandMore>
    //     <ExpandMore>
    //    { <span className='price fs-4  text-success '>{discount} off</span>}
    //     </ExpandMore>
    //   </CardActions>
    // </Card>


    


    <div className="product-grid col-md-4 mx-1 ">
        <div className="product-image">
          <Link id='link' to="#" className="image h-100 d-flex align-items-center">
            {photos && <img className="h-100" src={`${sorcImag}${img}`} alt='photoTwo' />}
          </Link>
          {discount ? <span className="product-discount-label">-{discount}%</span> : ''}

        </div>

        <div className="product-content">
          <h3 className="title"><Link id='link' to="#">{product_name.split(" ").splice(0, 2).concat(" ").join(" ")}</Link></h3>
          <div className="price">{price}LE</div>
        </div>
      </div>
  );
}
