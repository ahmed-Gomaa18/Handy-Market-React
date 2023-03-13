import React,{useState,useEffect} from 'react';
import axios from "axios";
import Order from '../Order/Order';

const OrderList = () => {
    const [Orders, setOrders] = useState([]);
    const userToken=localStorage.getItem("user-token");
    const ordersUrl="http://localhost:3000/api/v1/user/orders"


    useEffect(() => {
        axios.get(ordersUrl,{headers:{"Authorization":`Bearer ${userToken}`}})
        .then((data)=>{
            setOrders(data.data)
            console.log(data.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, []);
    return (
        <div>
           {
        <div className='d-flex flex-wrap ' >
                    <h1>Orders</h1>
                <div className='d-flex flex-wrap justify-content-evenly mt-4'>
                    {   
                    Orders?.map((order)=>(
                        <Order  key={order._id} {...order}/> ))
                    }
                </div>
        </div>
       }
        </div>
    );
}

export default OrderList;
