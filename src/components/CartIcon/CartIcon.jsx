import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingCart} from 'react-icons/fi';
import styles from './CartIcon.module.css';

const CartIcon = () => {

    const [totalQTY,totalQTYState] = useState(0);

    useEffect(()=>{
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal!= null) {
        let totQ = dataLocal.reduce((x,y) => x+y.qty,0);
        totalQTYState(totQ);
        }
     },[]);
    
    window.addEventListener("storage",(e) => {
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      let totQ = dataLocal?.reduce((x,y) => x+y.qty,0);
      if (totQ) {
        totalQTYState(totQ);
      }else{
        totalQTYState(0);
      }
    });
  
  return (
    <>
      <div className={`me-4 ${styles.cart}`}>
        <Link to='/cart'><FiShoppingCart className={`fs-4 ${styles.icon}`} /></Link>
        <span className={styles.cartBadgeIcon}>{totalQTY}</span>
      </div>
    </>
  )
}

export default CartIcon