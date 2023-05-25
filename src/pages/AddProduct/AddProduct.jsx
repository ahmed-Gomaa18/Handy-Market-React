import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CategoryProduct } from '../../components/CategoryProduct/CategoryProduct';
import styles from './AddProduct.module.css';

import { ToastContainer, toast  } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import AOS from 'aos';

import { CirclesWithBar } from 'react-loader-spinner'

let arrayOfCategoryID = [];
const AddProduct = () => {

    const [avalForm, setAvalForm] = useState('block')
    const [avalLoading, setavalLoading] = useState(false)

    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    let formRef = useRef(null);

    useEffect(()=>{
        AOS.init({duration: 1500});
    }, [])

    useEffect(() => {
        if(i18n.language == "en") {
            document.querySelector('#add-product').style.direction = "ltr";
        } else {
            document.querySelector('#add-product').style.direction = "rtl";
        }
    }, [i18n.language]);

    const [formStateData, setStateFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handelSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formErrors).some((error) => error !== null)) {
            toast.error('Error While Add Product.!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < formStateData.photos.length; i++) {
            formData.append('photos', formStateData.photos[i]);
        }
        formData.append('product_name', formStateData.product_name);
        formData.append('description', formStateData.description);
        formData.append('discount', formStateData.discount);
        formData.append('number_of_items', formStateData.number_of_items);
        formData.append('price', formStateData.price);

        for (let i = 0; i < formStateData.categories_id.length; i++) {
            formData.append('categories_id', formStateData.categories_id[i]);
        }


        // --------------------
        setAvalForm('none')
        setavalLoading(true)
        //---------------------


        axios.post('https://handy-market-api.onrender.com/api/v1/product', formData, {

            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${localStorage.getItem('user-token')}`
            }
        }).then((data) => {

            toast.success('Add Product Successfully.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })

            formRef.current.reset();

            setTimeout(() => {
                navigate('/')
            }, 500)
        }).catch((err) => {
            // --------------------
            setAvalForm('block')
            setavalLoading(false)
            //---------------------
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
            // If token expire
            if (err.response.data.message == 'Please Login again'){
                setTimeout(()=>{
                    localStorage.clear();
                    navigate('/auth/login');
                }, 1000)

            } 

        })
    }

    const handelChange = (e) => {
        if (e.target.name === 'categories_id') {
            if (e.target.checked) {
                arrayOfCategoryID.push(e.target.value);
                setStateFormData({ ...formStateData, [e.target.name]: arrayOfCategoryID });
            } else {
                let catInd = arrayOfCategoryID.indexOf(e.target.value);
                arrayOfCategoryID.splice(catInd, 1);
                setStateFormData({ ...formStateData, [e.target.name]: arrayOfCategoryID });
            }
        } else {
            setStateFormData({ ...formStateData, [e.target.name]: e.target.value });
        }

        const { name, value } = e.target;
        switch (name) {
            case 'product_name':
                setFormErrors({
                    ...formErrors,
                    product_name: value.length < 3 ? 'Product must be at least 3 characters long' : null
                });
                break;
            case 'photos':
                setFormErrors({
                    ...formErrors,
                    photos: value.length === 0 ? 'You Must Add At least one photo' : null
                });
                break;
            case 'description':
                setFormErrors({
                    ...formErrors,
                    description: value.length < 20 ? 'Product Description Must be at Least 20 Char' : null
                });
                break;
            case 'number_of_items':
                setFormErrors({
                    ...formErrors,
                    number_of_items: !value ? 'Number of Item is Required' : null
                });
                break;
            case 'price':
                setFormErrors({
                    ...formErrors,
                    price: !value ? 'Price is Required' : null
                });
                break;
            case 'discount':
                setFormErrors({
                    ...formErrors,
                    discount: value < 0 ? 'Discound Must be greater than 0' : null
                });
                break;
            case 'categories_id':
                setFormErrors({
                    ...formErrors,
                    // use arrayOfCategoryID as i push first in arr
                    categories_id: arrayOfCategoryID.length < 1 ? 'Poduct Should have at least one Category' : null
                });
                break;
            default:
                break;
        }
    }

    const handelPhotoChange = (e) => {
        setStateFormData({ ...formStateData, [e.target.name]: e.target.files });
    }

    return (
        <>
        <ToastContainer />
        
        <CirclesWithBar
        height="150"
        width="150"
        ariaLabel='circles-with-bar-loading'
        radius="10"
        wrapperStyle={{with: '50%', margin: '15% 20% 15%  43%' }}
        wrapperClass=""
        outerCircleColor="#72a499"
        innerCircleColor="#f31237"
        barColor="#ff6c02"
        visible={avalLoading}
        />

        <div className="mt-5 mb-5" style={{display: avalForm}}>
            <div id="add-product" className={`container rounded-2 ${styles.add_product_container}`}>
                <div className="row">
                    <h2 className="cartItems my-3 text-center pt-5" data-aos="fade-down">{t("Add Product")}</h2>
                </div>

                <div className="row">
                    
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <form className="mt-4 ps-3 col-12 row rounded-2" ref={formRef} onSubmit={handelSubmit} data-aos="fade-up">
                            <div className="mb-2 mt-2">
                                <label htmlFor="productName" className="form-label my-2 fs-5 text-muted">{t("Product Name")}:</label>
                                <input type="text" required name='product_name' className="input_control text-muted" onChange={handelChange} id="productName" placeholder='Enter Your Product Name Here...' />
                                {formErrors.product_name && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.product_name}</div>}
                            </div>

                            <div className="mb-2 mt-2">
                                <label htmlFor="photos" className="form-label my-2 fs-5 text-muted">{t("Product Images")}:</label>
                                <input type="file" required name='photos' className="input_control text-muted" onChange={handelPhotoChange} id="photos" multiple />
                                {formErrors.photos && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.photos}</div>}

                            </div>

                            <CategoryProduct handelChange={handelChange} formError={formErrors.categories_id} />

                            <div className='row mb-2 mt-2'>
                                <div className="col-4">
                                    <label htmlFor="numberOfItems" className="form-label my-2 fs-5 text-muted">{t("Product Qun")}:</label>
                                    <input type="number" required name='number_of_items' className="input_control text-muted" onChange={handelChange} min='1' id="numberOfItems" placeholder='number' />
                                    {formErrors.number_of_items && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.number_of_items}</div>}
                                </div>

                                <div className="col-4">
                                    <label htmlFor="price" className="form-label my-2 fs-5 text-muted">{t("Price")}:</label>
                                    <input type="number" required name='price' className="input_control text-muted" onChange={handelChange} id="price" min='1' placeholder='LE' />
                                    {formErrors.price && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.price}</div>}
                                </div>

                                <div className="col-4">
                                    <label htmlFor="discount" className="form-label my-2 fs-5 text-muted">{t("Discount")}:</label>
                                    <input type="number" required name='discount' className="input_control text-muted" onChange={handelChange} min='0' max='100' id="discount" placeholder='%' />
                                    {formErrors.discount && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.discount}</div>}
                                </div>
                            </div>

                            <div className="mb-2 mt-2">
                                <label htmlFor="description" className="form-label my-2 fs-5 text-muted">{t("Description")}:</label>
                                <textarea type="text" required name='description' className={`input_control text-muted ${styles.textarea}`} onChange={handelChange} id="description" placeholder='Descrip Your Product Here...' />
                                {formErrors.description && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.description}</div>}
                            </div>

                            <input type="submit" className={`mt-3 mb-5 btn justify-content-center w-25 m-auto fs-5 ${styles.btn_clear}`} value={t("Submit")} />

                        </form>
                    </div>

                    <div className="col-6 text-center d-lg-flex d-none align-items-center">
                        <img src="/images/addProduct/add_product.jpg" alt="addProduct" height="70%" width="100%" data-aos="zoom-in" />
                    </div>

                </div>
            </div>
        </div>

        </>
    )
}

export default AddProduct;
