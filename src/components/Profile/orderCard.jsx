import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';   
import {MdAddShoppingCart,MdLocationOn,MdOutlinePayment} from "react-icons/md";
import {BsCalendarDateFill,BsCurrencyDollar,BsTelephoneFill} from "react-icons/bs"
// import {VscLayoutStatusbar} from "react-icons/vsc"
import "../styles/user.favorites.style.css"

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

export default function OrderCard(props){
   const {products,payment_method,date,order_address,phone,status,totalPrice}=props
  return (
    <Card sx={{minWidth:300 }} className="cart me-1 mb-4 bg-warning">
     
      <CardContent>
        <Typography component={'span'}>
          <div className='d-flex justify-content-between'>
              <span className='fs-4'><MdAddShoppingCart/> cart</span>
              <span className='fs-4'>{products.length}Item</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'><MdLocationOn/></span>
          <span className='fs-6 mt-1'>{order_address.city},{order_address.street},{order_address.building_num}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'><MdOutlinePayment/></span>
          <span className='fs-4'>{payment_method}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'><BsTelephoneFill/></span>
          <span className='fs-4'>{phone}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'>status</span>
          <span className='fs-4'>{status}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'><BsCurrencyDollar/>Total Price</span>
          <span className='fs-4'>{totalPrice}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4'><BsCalendarDateFill/></span>
          <span className='fs-6 mt-1'>{date?.split('T')[0]}</span>
          </div>
        </Typography>
      </CardContent>
      
    </Card>
  );
}

