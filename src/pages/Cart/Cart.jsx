import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Action_buttons from "../../components/Action_buttons/Action_buttons";
import styles from "./Cart.module.css";


const Cart = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('role') !== 'Customer' ){
            navigate('/')
        }
    }, [])


    //const sorcImag = 'http://localhost:3000/api/v1/image';

    const [items, itemsState] = useState([]);

    const getData = () => {
        let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
        if (dataLocal != null) {
            itemsState(dataLocal);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [totalPrice, totalPriceState] = useState(0);

    useEffect(() => {
        let arrayItems = items;
        let totPric = arrayItems.reduce((x, y) => x + (y.price * y.qty), 0);
        totalPriceState(totPric);
    }, [items]);

    window.addEventListener("storage", (e) => {
        getData();
    });

    const clearCart = () => {
        localStorage.setItem('data-cart', JSON.stringify([]));
        itemsState([]);
        window.dispatchEvent(new Event('storage'));
    }
    return (
        <section className="ux-app">

            <div className="container">
                <div className="row">
                    <h2 className='cartItems my-3 text-center pt-5'>{t("Shopping Cart")}</h2>
                    {items.length === 0 && <h5 className='text-center h2'>{t("Cart is empty")}</h5>}
                </div>

                <div className="row justify-content-between my-5">
                    <div className="basket col-sm-12 col-md-7 col-md-offset-1">
                        {items && items.map((item, index) => (
                            <div className={`${styles.product} ${styles.ux_card}`} key={index}>
                                <div className="col-3">
                                    <img src={`${item.photos[0]}`} alt={item.product_name} className='w-100 h-100' />
                                </div>

                                <div className={`col-9 ${styles.product_info}`}>
                                    <div className="head d-flex justify-content-between">
                                        <span className="title pb-2"><Link href="/product/{id}" className='fs-4'>{item.product_name}</Link></span>
                                        <span className={`pb-2 fs-4 ${styles.price}`}>{item.price} LE</span>
                                    </div>

                                    <div className="content mb-2 d-flex justify-content-between">
                                        <span className={styles.shop}>{t("Shop Name")} : {item.created_by.user_name} </span>
                                        <span className={styles.stock}>{t("In Stock")} : {item.number_of_items}</span>
                                    </div>

                                    <div className="action d-flex flex-column">
                                        <Action_buttons item={item} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`col-12 col-md-4 ${styles.summary}`}>
                        <dl className={`d-flex flex-column ${styles.subtotal}`}>
                            <div className="subtotal_price d-flex justify-content-center fs-3 fw-bold py-2">
                                <dt>{t("Summary")}</dt>
                            </div>
                        </dl>

                        <dl className={`w-100 py-2 d-flex align-content-center justify-content-between ${styles.total}`}>
                            <dt>{t("Total")}</dt>
                            <dd>{totalPrice} LE</dd>
                        </dl>

                        <dl className={`w-100 py-4 d-flex align-content-center justify-content-between ${styles.cart_actions}`}>
                            <button className={`btn w-75 mb-2 ${styles.btn_clear}`} onClick={() => clearCart()}>{t("Clear All")}</button>
                            <Link to='/order'>
                                <button className={`btn w-75 ${styles.btn_checkout}`}>
                                {t("Checkout")}
                                </button>
                            </Link>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Cart;