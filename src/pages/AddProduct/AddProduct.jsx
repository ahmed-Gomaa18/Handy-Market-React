import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CategoryProduct } from '../../components/CategoryProduct/CategoryProduct';
import styles from './AddProduct.module.css';

let arrayOfCategoryID = [];
const AddProduct = () => {
    const navigate = useNavigate();
    let formRef = useRef(null);

    const [formStateData, setStateFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [successAlert, setSuccessAlert] = useState(null)
    const [failAlert, setFailAlert] = useState(null)

    const handelSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formErrors).some((error) => error !== null)) {
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

        console.log(formStateData);

        axios.post('http://localhost:3000/api/v1/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${localStorage.getItem('user-token')}`
            }
        }).then((data) => {
            console.log(data);
            setSuccessAlert(() => 'Product Created Successfully...')
            formRef.current.reset();
            setTimeout(() => {
                navigate('/')
            }, 500)
        }).catch((err) => {
            setFailAlert(() => 'Bad Request')
            console.log(err.response);
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
            console.log(formStateData);
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
            <div id={styles.add_product_container} className="container mt-5 mb-5 rounded-2">
                <div className="row">
                    <h2 className="cartItems my-3 text-center pt-5">Add Product</h2>
                </div>

                <div className="row">
                    
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <form className="mt-4 ps-3 col-12 row rounded-2" ref={formRef} onSubmit={handelSubmit}>
                            
                            {failAlert && <div className="alert alert-danger text-center" role="alert"> {failAlert}</div>}

                            {successAlert && <div className="alert alert-success text-center" role="alert"> {successAlert}</div>}

                            <div className="mb-2 mt-2">
                                <label htmlFor="productName" className="form-label my-2 fs-5 text-muted">Product Name:</label>
                                <input type="text" required name='product_name' className="input_control text-muted" onChange={handelChange} id="productName" placeholder='Enter Your Product Name Here...' />
                                {formErrors.product_name && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.product_name}</div>}
                            </div>

                            <div className="mb-2 mt-2">
                                <label htmlFor="photos" className="form-label my-2 fs-5 text-muted">Product Images:</label>
                                <input type="file" required name='photos' className="input_control text-muted" onChange={handelPhotoChange} id="photos" multiple />
                                {formErrors.photos && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.photos}</div>}
                            </div>

                            <CategoryProduct handelChange={handelChange} formError={formErrors.categories_id} />

                            <div className='row mb-2 mt-2'>
                                <div className="col-4">
                                    <label htmlFor="numberOfItems" className="form-label my-2 fs-5 text-muted">Product Qun:</label>
                                    <input type="number" required name='number_of_items' className="input_control text-muted" onChange={handelChange} min='1' id="numberOfItems" placeholder='number' />
                                    {formErrors.number_of_items && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.number_of_items}</div>}
                                </div>

                                <div className="col-4">
                                    <label htmlFor="price" className="form-label my-2 fs-5 text-muted">Price:</label>
                                    <input type="number" required name='price' className="input_control text-muted" onChange={handelChange} id="price" min='1' placeholder='LE' />
                                    {formErrors.price && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.price}</div>}
                                </div>

                                <div className="col-4">
                                    <label htmlFor="discount" className="form-label my-2 fs-5 text-muted">Discount:</label>
                                    <input type="number" required name='discount' className="input_control text-muted" onChange={handelChange} min='1' max='100' id="discount" placeholder='%' />
                                    {formErrors.discount && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.discount}</div>}
                                </div>
                            </div>

                            <div className="mb-2 mt-2">
                                <label htmlFor="description" className="form-label my-2 fs-5 text-muted">Description:</label>
                                <textarea type="text" required name='description' className={`input_control text-muted ${styles.textarea}`} onChange={handelChange} id="description" placeholder='Descrip Your Product Here...' />
                                {formErrors.description && <div className="h6 pb-2 my-2 text-danger border-bottom border-danger text-center">{formErrors.description}</div>}
                            </div>

                            <input type="submit" className={`mt-3 mb-5 btn justify-content-center w-25 m-auto fs-5 ${styles.btn_clear}`} value="Submit" />

                        </form>
                    </div>

                    <div className="col-6 text-center d-lg-flex d-none align-items-center">
                        <img src="/images/addProduct/add_product.jpg" alt="addProduct" height="70%" width="100%" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddProduct;