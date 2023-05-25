import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './SellerProducts.module.css';

import axios from "axios"
const SellerProducts = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem("user-id");
  const [allProducts, setProductsState] = useState(null);

  const ProductUrl = "https://handy-market-api.onrender.com/api/v1/product/seller/true/";
  //const sorcImag = 'http://localhost:3000/api/v1/image';

  //authorization
  useEffect(() => {
    let userToken = localStorage.getItem("user-token")
    axios.get(`${ProductUrl}`, { headers: { "authorization": `Bearer ${userToken}` } }).then((data) => {
      let products = data.data.products;
      setProductsState(products);
    })
  }, []);

  const handleClick = (e, product) => {
    navigate(`/seller/update/${product._id}/${userId}`)
  }
  return (
    <div className={` container my-5 shadow ${styles.mainColor}`}>
      <div className={`row my-5 p-5 `} >

        {allProducts && allProducts?.map((product, index) => (
          <div className="product-grid col-md-4 mt-4  ">
            <div className="product-image">
                {(product.photos[0] && <img key={product._id} className='img-fluid w-100 h-100' alt='not has photo' src={`${product.photos[0]}`} onClick={((e) => handleClick(e, product))}></img>)}
            </div>
          </div>
              ))
        }
      </div>
    </div>
  );
};

export default SellerProducts;
