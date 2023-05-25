import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import styles from './UpdateService.module.css';

const UpdateService = (props) => {
    const routeParams = useParams();
    const deleteItem = props.deleteItem
    const productId = routeParams['id'];
    const userId = routeParams['userId'];
    const [productData, setProductsState] = useState({ Data: null })
    
    const navigate = useNavigate();
    const ProductUrl = "https://handy-market-api.onrender.com/api/v1/product/";
    //const sorcImag = 'http://localhost:3000/api/v1/image';
    const productUpdateUrl = "https://handy-market-api.onrender.com/api/v1/product/seller/"
    const ProductUrlDelete = `https://handy-market-api.onrender.com/api/v1/product/seller/`;

    const userToken = localStorage.getItem("user-token");
    useEffect(() => {
        axios.get(`${ProductUrl}${productId}`).then((data) => {
            let product = data.data.product;
            setProductsState({ Data: product });
        })
    }, []);

    function handleFileSelect(event) {
        console.log(event.target.value)
    }
    const handleDelete = () => {
        axios.delete(`${ProductUrlDelete}${userId}/delete/${productId}`, { headers: { "authorization": `Bearer ${userToken}` } })
            .then((data) => {
                let test = data.data;
                alert(test.message);
                navigate("/seller/profile")
            });
    }

    const handleUpdate = async () => {
        const { product_name, sold_items, discount, price, number_of_items, description } = productData.Data

        const obj = { product_name, sold_items, discount, price, number_of_items, description };

        await axios.patch(`${productUpdateUrl}${userId}/update/${productId}`, obj,
            {
                headers: { "Authorization": `Bearer ${userToken}`, 'Content-Type': 'application/json' }
            }).then((data) => {
                alert(data.data.message)
                navigate(`/seller/profile`)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDataChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        if (name == "sold_items" || name == "price" || name == "discount" || name == "number_of_items")
            value = +value;
        const allData = { ...productData.Data, [name]: value }
        setProductsState({ Data: allData })
    }

    return (

        <div className={`container  shadow`} >
            <div className="row my-5 p-5">

                <div className='col-md-4 shadow  '>
                    {productData.Data?.photos[0] && <img className='img-fluid w-100 h-100' src={`${productData.Data?.photos[0]}`} />}

                </div>
                <div className='col-md-8'>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label className='labelUpdateService' htmlFor="Name">Name</label>
                        </div>
                        <div className='col-7'>
                            <input type="text" id="Name" className="form-control col-auto" name='product_name' value={productData.Data?.product_name} onChange={handleDataChange} />
                        </div>
                    </div>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label htmlFor="solid" className='labelUpdateService'>Solid Items</label>
                        </div>
                        <div className='col-7'>
                            <input type="text" id="solid" className="form-control col-auto" name='sold_items' value={productData.Data?.sold_items} disabled />
                        </div>
                    </div>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label className='labelUpdateService' htmlFor="price" >Price</label>
                        </div>
                        <div className='col-7'>
                            <input type="text" id="price" className="form-control" name='price' value={productData.Data?.price} onChange={handleDataChange} />
                        </div>
                    </div>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label htmlFor="discount" className='labelUpdateService'>Discount</label>
                        </div>
                        <div className='col-7'>
                            <input type="text" id="discount" className="form-control" name='discount' value={productData.Data?.discount} onChange={handleDataChange} />
                        </div>
                    </div>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label htmlFor="itemsAvailable" className='labelUpdateService'>available Items</label>
                        </div>
                        <div className='col-7'>
                            <input type="text" id="itemsAvailable" className="form-control" name='number_of_items' value={productData.Data?.number_of_items} onChange={handleDataChange} />
                        </div>
                    </div>
                    <div className='mb-3 row  justify-content-center'>
                        <div className='col-5 col-sm-2'>
                            <label htmlFor="description" className='labelUpdateService'>Description</label>
                        </div>
                        <div className='col-7'>
                            <textarea type="text" id="description" cols="4" rows="5" className="form-control" name='description' value={productData.Data?.description} onChange={handleDataChange} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>

                        <button className={`${styles.mybtn} ms-5 `} onClick={handleUpdate}>Update</button>

                        <button className={`${styles.btn2} mx-1`} onClick={handleDelete}>Delete</button>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default UpdateService;
// https://handy-market-api.onrender.com/api/v1/product/seller/6404ba1c3a9df51fb781c06f/update/64065e075bbca500ca2ddec7