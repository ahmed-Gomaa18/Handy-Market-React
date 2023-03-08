import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowProduct = (props) => {
   
  const [product, setProduct] = useState(null);
  let { prodId } = props;
 

  const imgSrc = 'http://localhost:3000/api/v1/image';

  localStorage.setItem("userToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDQ4OWJhZTk3NDViZmY1ZmVkNWE3MCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODA0NDAwOSwiZXhwIjoxNjc4NjQ4ODA5fQ.r5N5PWyZJmfDDz9aM2qrJ6hmDvob-pzG1Nv1XtIdY1c');


  useEffect(() => {

    axios.get(`http://localhost:3000/api/v1/admin/notApproval/${prodId}`,{headers:{"Authorization": `Bearer ${localStorage.getItem("userToken")}`}}).then((data) => {
    let productData = data.data.product;
      setProduct(productData);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [product,prodId ]);

  return (
    <>
    {product && 
   
        <div className="col-lg-10">
            <div className="row my-5">
                <div className="section-title text-center ">
                    <h2 className="title title-icon-both">Product View</h2>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-6">
                    <div className="product-zoom w-100">
                        <img className="w-100" src={`${imgSrc}${product.photos[0]}`} alt={product.product_name} />
                    </div>
                </div>
                <div className="col-12 col-md-5 offset-md-1">
                    <div className="product-info">
                        {/* /////////////////// */}
                        <h3 className="product-title my-3">{product.product_name}</h3>
                        {/* //////////// */}
                        <div className="product-inventory fw-bold mb-3">
                            <span className="inventory-title">Discount: </span> <span className="variant-inventory">{product.discount}%</span>
                        </div>
                        <div className="product-price price mt-2 mb-4">
                            <span className=" fs-3 fw-bold me-2">
                                <span className="money" data-currency-usd="$60.00" data-currency="USD">{product.price}</span>
                            </span>
                        </div>
                        

                        {/* /////////// */}

                        <div className="product-inventory fw-bold mb-3">
                            <span className="inventory-title">Availability: </span> <span className="variant-inventory">{product.number_of_items}</span>
                        </div>

                        {/* /////////// */}
                        <div className="product-desc mb-4">{product.description}</div>
                        {/* /////////// */}
                        <div className="product-desc mb-4"><button className='btn btn-dark'><Link to={"/dashboard"} >Back</Link></button></div>

                    </div>
                </div>
            </div>
        </div>
  
    }

    </>
  )
};

export default ShowProduct;





