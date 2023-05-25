import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Action_buttons from "../../components/Action_buttons/Action_buttons";
import styles from './Order.module.css';

import { ToastContainer, toast  } from 'react-toastify';

import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";

const Order = () => {
    //const sorcImag = 'http://localhost:3000/api/v1/image';

    const { t } = useTranslation();

    const [items, itemsState] = useState([]);
    const [totalPrice, totalPriceState] = useState(0);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();


    // First
    // Check role customer and has cart to go to order
    useEffect(()=>{

        if(localStorage.getItem('role') === 'Customer' && JSON.parse(localStorage.getItem('data-cart'))?.length > 0){
            console.log('valid')
        }else{
            navigate('/')
        }
    }, [])

    const getData = () => {
        let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
        if (dataLocal != null) {
            itemsState(dataLocal);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        axios.post('https://handy-market-api.onrender.com/api/v1/order/orderTotalPrice', {items},{
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        .then((data)=>{

            totalPriceState(data.data.total);
        })
        .catch((err)=>{
            console.log(err)
        })


    }, [items]);

    window.addEventListener("storage", (e) => {
        getData();
    });

    const [form, setForm] = useState({
        order_address: {
            city: "",
            street: "",
            building_num: "",
        },
        phone: "",
        payment_method: "",
        products: []
    });

    const UpdateAddress = e => {
        form.order_address.building_num = +form.order_address.building_num;
        setForm((prev) => {
            return {
                ...prev, order_address: {
                    ...prev.order_address,
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };

    const validate = (val) => {
        const errors = {};
        const phonenum = /^\d{11}$/;
        if (!val.payment_method) {
            errors.payment_method = "payment_method is required"
        }

        if (!val.order_address) {
            errors.order_address = "address is required"
        }
        if (!val.phone) {
            errors.phone = "phone is required"
        } else if (!phonenum.test(form.phone)) {
            errors.phone = "phone is not vaild"
        }
        return errors;
    }
    const getDataForm = () => {
        getData();
        let product = {};
        for (let i = 0; i < items.length; i++) {
            product.product_id = items[i]._id;
            product.quantity = items[i].qty;
            product.unitPrice = items[i].price;
            form.products.push(product);
        }

        console.log(items);
        console.log(form.products);
    }
    const clearCart = () => {
        localStorage.setItem('data-cart', JSON.stringify([]));
        itemsState([]);
        window.dispatchEvent(new Event('storage'));
    }

    const token = localStorage.getItem('user-token');



    // Form Need To Be Valid
    const onSubmitForm = e => {
        e.preventDefault();
        getDataForm();
        form.order_address.building_num = +form.order_address.building_num;
        setFormErrors(validate(form));

        // Stop Submit if has Error
        if(Object.keys(validate(form)).length > 0){
            toast.error('Opps your data is not valid', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            })
            return;
        }

        //console.log(form);
        Swal.fire({
            title: 'Complete Order?',
            showCancelButton: true,
            confirmButtonText: 'Order',
            icon: 'question'
          }).then((result) => {
            if (result.isConfirmed) {
            
                if (form.payment_method === "Cash") {
                    axios.post('https://handy-market-api.onrender.com/api/v1/order/create', form, {
                            headers: {
                                'authorization': `Bearer ${token}`
                            }
                    }).then((res) => {
                        console.log(res);
                        // alert("Sucess Creat Your Order");
                        toast.success('Success Creat Your Order', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000
                        })
                        clearCart();

                        setTimeout(()=>{
                            navigate('/');
                        }, 2000)
                        
                    }).catch((err) => {
                        // Check
                        toast.error(err.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000
                        })
                        console.log(err.response.data.message)
                    });
                } else {
                    
                    localStorage.setItem("order-data",JSON.stringify(form));

                    navigate('payment');


                }
            } 
          })
        
    };


    return (
        <>
            <ToastContainer />

            <div className="conatiner mt-5 pb-5">
                <div className="row justify-content-center">
                    <div className=" col-md-6  p-5 rounded shadow">
                        <form className='mb-5' onSubmit={onSubmitForm} >
                            <div className=" row my-2">
                                <div className="form-group col-md-12 pb-3">
                                    <label className="my-2 fs-5" htmlFor="phone">{t("Phone")}</label>
                                    <input type="text" name="phone" className={styles.input_control} id="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.phone}
                                    </div>
                                </div>

                                <div className="form-group col-md-12 pb-3">
                                    <label className='my-2 fs-5' htmlFor="city">{t("City")}</label>
                                    <input type="text" name="city" className={styles.input_control} id="city" placeholder="city" value={form.order_address.city} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.order_address?.city}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-2 pb-3">
                                <label className='my-2 fs-5' htmlFor="street">{t("Street")}</label>
                                <input type="text" name="street" className={styles.input_control} id="street" placeholder="street" value={form.order_address.street} onChange={UpdateAddress} />
                                <div className=" text-danger">
                                    {formErrors.order_address?.street}
                                </div>
                            </div>
                            <div className="row mb-4">

                                <div className="form-group col-md-12 pb-3">
                                    <label className='my-2 fs-5' htmlFor="building_num">{t("Building_num")}</label>
                                    <input type="text" className={styles.input_control} name="building_num" id="building_num" placeholder="building_num" value={form.order_address.building_num} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.order_address?.building_num}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="form-check form-check-inline">
                                    <input type="radio" className="form-check-input" id="cash" name="payment_method" value="Cash" onChange={(e) => setForm((prev) => ({ ...prev, payment_method: e.target.value }))} />
                                    <label className="form-check-label" htmlFor="cash">{t("Cash")}</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="radio" className="form-check-input" id="visa" name="payment_method" value="Visa" onChange={(e) => setForm((prev) => ({ ...prev, payment_method: e.target.value }))} />
                                    <label className="form-check-label" htmlFor="visa">{t("Visa")}</label>
                                </div>
                                {formErrors.payment_method && <div class="text-danger">
                                    {formErrors.payment_method}
                                </div>
                                }
                            </div>


                            <div className=''>
                                <button type="submit" className={`btn m-2 px-l-5 px-3 ${styles.btn_clear}`}>
                                    {t("Save and Deliver")}
                                </button>

                                <button type="reset" className={`btn m-3 px-l-5 px-4 ${styles.btn_checkout}`}>
                                    <Link className="text-decoration-none text-white" to='/store'>
                                        {t("Cancel")}
                                    </Link>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className=" ms-5 col-lg-3 col-md-5 ">
                        <div className="card p-4 w-100">
                            <h4 className='p-1 ms-2 text-center'>{t("your Orders")}</h4> <hr />
                            {items && items.map((item, index) => (
                                <div key={index} className={styles.card_body}>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="order_img">
                                            <img className="w-25 img-fluid" src={`${item.photos[0]}`} alt="Card image cap" />
                                        </div>

                                        <div className="order_title">
                                            <h6>{item.product_name}</h6>
                                            <p className='price'>{item.price}EL</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Action_buttons item={item} />
                                    </div>
                                </div>
                            ))}

                            <p className="text-white text-center btn btn-dark mt-5 mx-auto  w-50">{t("Total")}:{totalPrice} EGP</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Order