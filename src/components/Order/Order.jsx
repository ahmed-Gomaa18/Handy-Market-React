import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';   
import {MdAddShoppingCart,MdLocationOn,MdOutlinePayment} from "react-icons/md";
import {BsCalendarDateFill,BsCurrencyDollar,BsTelephoneFill} from "react-icons/bs"
import FactCheckIcon from '@mui/icons-material/FactCheck';
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

export default function Order(props){
   const {products,payment_method,date,order_address,phone,status,totalPrice}=props
  return (
    <Card className="cart me-1 mb-4 rounded shadow ">
     
      <CardContent>
        <Typography component={'span'}>
          <div className='d-flex justify-content-between'>
              <span className='fs-4 text-primary'><MdAddShoppingCart/></span>
              <span className='fs-4'>{products.length}Item</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'><MdLocationOn/></span>
          <span className='fs-6 mt-1'>{order_address.city},{order_address.street},{order_address.building_num}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'><MdOutlinePayment/></span>
          <span className='fs-4'>{payment_method}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'><BsTelephoneFill/></span>
          <span className='fs-4'>{phone}</span>
          </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'><FactCheckIcon/></span>
          <span className='fs-4'>{status}</span>
          </div>
         
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'><BsCalendarDateFill/></span>
          <span className='fs-6 mt-1'>{date?.split('T')[0]}</span>
          </div>
          <div className='px-5' >
                                <hr className='text-primary '/>
                            </div>
          <div className='d-flex justify-content-between' >
          <span className='fs-4 text-primary'>Total Price</span>
          <span className='fs-4'>{totalPrice} <span>LE</span> </span>
          </div>
        </Typography>
      </CardContent>
      
    </Card>
  );
}

