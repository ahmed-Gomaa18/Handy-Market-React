import React, { useState, useEffect } from 'react';
import { BsHeart } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ShowProduct = () => {
   
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rate, setRate] = useState(4);
  let { prodId } = useParams();

  const imgSrc = 'http://localhost:3000/api/v1/image';

  localStorage.setItem("userToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDU1OWRhYmNmZWM2ODAyMWQwODg2MyIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODA3MjM2NiwiZXhwIjoxNjc4MTU4NzY2fQ.HQu8UniYD_-jPYsHbnGjLSKcQfwNxfeXuImkBxHwiyc');


  const onUpdateRate = (e) => {
    setRate(e.target.value);
    console.log(product._id);
    console.log(rate);
    axios.post('http://localhost:3000/api/v1/review/rating', {
      'product_id': product._id, 'rating': rate
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      }
    }).then((data) => {
      console.log(data.data);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/product/${prodId}`).then((data) => {
      console.log(data.data);
      let productData = data.data.product;
      let relProducts = data.data.nRelatedProduct;
      setRelatedProducts(relProducts);
      setProduct(productData);
      let ratings = 0;
      let ProductRate = product.ratings_id.forEach((rate) => {
        ratings += rate.rating;
        return ratings;
      });

      // still in working
      let rates = ProductRate / product.ratings_id.length;
      console.log(rates);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [product, relatedProducts]);

  return (
    <>
    {product &&
    <section>
        <div className="container">
            <div className="row my-5">
                <div className="section-title text-center">
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
                        <div className="product-rating">
                            <span className="spr-badge" id="spr_badge" data-rating={product.ratings_id.length}>
                                <span className="spr-starrating spr-badge-starrating">
                                    <i className="spr-icon spr-icon-star" aria-hidden="true"></i>
                                    <Rating className="rating" name="product_rating" value={product.ratings_id.rating} onChange={(e) => onUpdateRate(e)} />
                                </span>
                                <span className="rating-caption ms-2">{product.ratings_id.length} review</span>
                            </span>
                        </div>
                        {/* //////////// */}
                        <h3 className="product-title my-3">{product.product_name}</h3>
                        {/* //////////// */}
                        <div className="product-inventory fw-bold mb-3">
                            <span className="inventory-title">Discount: </span> <span className="variant-inventory">{product.discount}%</span>
                        </div>
                        <div className="product-price price mt-2 mb-4">
                            <span className="price old fs-3 fw-bold me-2">
                                <span className="money" data-currency-usd="$60.00" data-currency="USD">{product.price}</span>
                            </span>
                            <span className="price new fs-3 fw-bold">
                                <span className="money" data-currency-usd="$39.00" data-currency="USD">{ product.price - (product.price * product.discount / 100) }</span>
                            </span>
                        </div>
                        

                        {/* /////////// */}

                        <div className="product-inventory fw-bold mb-3">
                            <span className="inventory-title">Availability: </span> <span className="variant-inventory">{product.number_of_items}</span>
                        </div>

                        {/* /////////// */}
                        <div className="product-desc mb-4">{product.description}</div>

                        {/* /////////// */}

                        <div className="product-buttons">
                            <a className="action-wishlist btn btn-icon btn-outline btn-hover-dark">
                                <BsHeart className="fs-3" />  
                            </a>
                            <button type="submit" className="btn btn-dark btn-outline-hover-dark" id="AddToCart">Add To Cart</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    }

    </>
  )
};

export default ShowProduct;





