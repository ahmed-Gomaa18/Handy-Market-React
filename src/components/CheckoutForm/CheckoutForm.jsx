import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import styles from './CheckoutForm.module.css'

import { toast } from 'react-toastify';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CheckoutForm = () => {
    const { t } = useTranslation();
    const stripe = useStripe();
    const elements = useElements();

    // const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();


    const clearCart = () => {
        localStorage.setItem('data-cart', JSON.stringify([]));
        window.dispatchEvent(new Event('storage'));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            //return_url: `${window.location.origin}/completion`,
            //create order
        },
        redirect: "if_required",
        });

        if (error) {

            // localStorage.removeItem('order-data');
            toast.error('Opps Error While Pay', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            })

            setTimeout(()=>{
                navigate('/order');
            }, 2000)


        // setMessage(error.message);
        }else if(paymentIntent && paymentIntent.status === "succeeded") {

            // Create Order Here

            axios.post('https://handy-market-api.onrender.com/api/v1/order/create', JSON.parse(localStorage.getItem('order-data')), {
                headers:{
                    'Content-Type' : 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('user-token')} `
                }
            })
            .then((data)=>{
                localStorage.removeItem('order-data');
                clearCart()
                toast.success('Your Order completed successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                })

                setTimeout(()=>{
                    navigate('/');
                }, 2000)
            }).catch((err)=>{
                console.log(err) ; 
            })


        }
        else {

            // localStorage.removeItem('order-data');
            toast.error('Opps Error While Pay', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            })
            
            setTimeout(()=>{
                navigate('/order');
            }, 2000)
            // redirect
        }

        setIsProcessing(false);
    };

    return (
        <form className={styles.payment_form} onSubmit={handleSubmit}>
        <PaymentElement />
        <button className={`mt-4 ${styles.mybtn}`} disabled={isProcessing || !stripe || !elements} id="submit">
            <span >
            {isProcessing ? `${t("Processing ...")}` : `${t("Pay now")}`}
            </span>
        </button>
        {/* Show any error or success messages */}
        {/* {message && <div id="payment-message">{message}</div>} */}
        </form>
    );
}

export default CheckoutForm