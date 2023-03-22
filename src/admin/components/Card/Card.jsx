import React, { useState } from "react";
import styles from  "./Card.module.css";
import axios from 'axios';
import "react-circular-progressbar/dist/styles.css";
import { UilPackage, UilUsersAlt,UilMoneyWithdrawal } from "@iconscout/react-unicons";

const Card = () => {
  return (
  <div className={styles.Cards}>
    <div className={styles.parentContainer}>
      <CompactCard/>
    </div>
  </div>
  );
};


const CompactCard = () => {
  const [balanceData, balanceDataState] = useState([]);

  axios.get('https://handy-market-api.onrender.com/api/v1/admin/lastBalance', { headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } }
  ).then((data) => {
    var test = data.data.message;
    balanceDataState(...test);
    
  }).catch((err) => {
    console.log("error msg", err);
  });
  
  const [totalOrders, totalOrdersState] = useState([]);

  axios.get('https://handy-market-api.onrender.com/api/v1/admin/NumberOfBalance', { headers: { "Authorization": `Bearer ${localStorage.getItem("user-token")}` } }
  ).then((data) => {
    var test = data.data.message;
    totalOrdersState(test);
  }).catch((err) => {
    console.log("error msg", err);
  });

  const [totalSeller, totalSellerState] = useState([]);

  axios.get('https://handy-market-api.onrender.com/api/v1/admin/allSellers',{
      headers: {"authorization": `Bearer ${localStorage.getItem("user-token")}` }
    }).then((data) => {
      let test = data.data.length;
      totalSellerState(test);
    }).catch((err) => {
      console.log("error msg", err);
    });

  return (
    <div className="row">
    {/* total profit  */}

    <div className={` col-4 ${styles.RevenueCard}`}>
        <div className={styles.radialBar}>
          <span>Revenue</span>
        </div>

        <div className={styles.detail}>
          <UilMoneyWithdrawal />
          <span>{balanceData.total_profit} LE</span>
          <span>Last 24 hours</span>
        </div>
    </div>
    
    {/* number of orders we have */}

    <div className={` col-4 ${styles.OrdersCard}`}>
        <div className={styles.radialBar}>
          <span>Number of orders</span>
        </div>

        <div className={styles.detail}>
          <UilPackage />
          <span>{totalOrders} </span>
          <span>Last 24 hours</span>
        </div>
    </div>
    
        
    {/* number of Sellers we have */}

    <div className={` col-4 ${styles.SellersCard}`}>
        <div className={styles.radialBar}>
          <span>Number of Sellers</span>
        </div>

        <div className={styles.detail}>
          <UilUsersAlt />
          <span>{totalSeller} </span>
          <span>Last 24 hours</span>
        </div>
    </div>
    </div>

  );
}

export default Card;
