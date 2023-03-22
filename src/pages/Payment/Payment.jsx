import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';




var key = true;

const Payment = () => {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();
    
    // First
    // Check role customer and has order data 
    useEffect(()=>{
        if(localStorage.getItem('role') !== 'Customer') {
            navigate('/')
        }
    }, [])

    // Publish key
    useEffect(()=>{
        setStripePromise(loadStripe('pk_test_51Mj0vbJBCDc7zAzcv9zGK3aCO98psw2CRaZR0EjkggTcGNnwNRocew0oO02NFmVUTe5iQRqIk4pLrHNMUKTddYvm00xUKzGleA'));
    }, [])
    
    useEffect(()=>{
        let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
        if (dataLocal != null) {
            setItems(dataLocal);
        }
    }, [])

    useEffect(()=>{
        axios.post('https://handy-market-api.onrender.com/api/v1/order/orderTotalPrice', {items},{
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        .then((data)=>{
            // Check get total before call payment for one time
            if(data.data.total && key){

                let total = data.data.total
                axios.post('https://handy-market-api.onrender.com/api/v1/payment', {total}, {
                    headers:{
                        'Content-Type' : 'application/json',

                    }
                })
                .then((data)=>{

                    setClientSecret(data.data.clientSecret)

                })
                .catch((err)=>{
                    console.log(err)
                })
                // change key 
                key = false;

            }


            setTotalPrice(()=> data.data.total );

        })
        .catch((err)=>{
            console.log(err)
        })
    })

  return (
        <>

        < ToastContainer />

        <div className="col-11 mt-5 pb-5">
            <div className="row justify-content-center">


                <div className=" ms-5 col-lg-3 col-md-5 ">
                    <div className="card p-4 w-100">
                        <h4 className='p-1 ms-2 text-center'>{t("Pay Your Orders")}</h4> <hr />
                        
                        <img src="/images/payment/onlinePayment.png" alt="Payment Image" width="100%" />
                        {/* #635bff */}
                        <p className="text-white text-center bg-dark mt-5 p-1 mx-auto  w-50 rounded">{t("Total")}: {totalPrice} EGP</p>
                    </div>

                </div>

                <div className=" col-md-6  p-5 rounded shadow">
                <h4 className='text-center'>{t("Please Fill Your Card")}</h4>
                {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
                )}

                </div>


            </div>
        </div>
        </>
    )
}

export default Payment