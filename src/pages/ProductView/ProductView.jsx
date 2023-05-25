import React, { useState, useEffect } from 'react';
import { BsHeart } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductView.module.css';

import { ToastContainer, toast } from 'react-toastify';

import AddItemToCart from '../../components/AddItemToCart/AddItemToCart';
import { useTranslation } from 'react-i18next';

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rate, setRate] = useState();
  let { prodId } = useParams();
  const { t } = useTranslation();
  //const imgSrc = 'http://localhost:3000/api/v1/image';

  const onUpdateRate = async(e) => {

    console.log(+e.target.defaultValue)
    // setRate(e.target.defaultValue);
    // console.log(rate);
   await axios.post('https://handy-market-api.onrender.com/api/v1/review/rating', {
      'product_id': product._id, 'rating': +e.target.defaultValue

    }, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('user-token')}`
      }
    }).then((data) => {
      console.log(data.data);
      const dataRating =data.data.rate.rating;
      setRate(dataRating);

      toast.success('Add Rating Successfully.', {
        position: toast.POSITION.TOP_RIGHT
      })


    }).catch((err) => {
      console.log("error msg", err);
    });
  }

  useEffect(() => {

    axios.get(`https://handy-market-api.onrender.com/api/v1/product/${prodId}`).then((data) => {

      let productData = data.data.product;
      let relProducts = data.data.nRelatedProduct;
      setRelatedProducts(relProducts);
      setProduct(productData);
    }).catch((err) => {
      console.log("error msg", err);
    });
  }, [prodId]);

  const calculateRating = (ratings) => {
    let containerNum = 0;
    ratings.forEach((rate) => {
      containerNum += rate.rating;
    })
    return (Math.round(containerNum / ratings.length))
  }

  // Add To Favorite
  const addToFavorite = (product_id)=>{
    axios.patch(`https://handy-market-api.onrender.com/api/v1/user/favorit/${product_id}`, {}, {
        headers:{
            'Content-Type' : 'application/json',
            'authorization': `Bearer ${localStorage.getItem('user-token')}`
        }
    })
    .then((data)=>{
        toast.success('Add This Product to Favorite.', {
            position: toast.POSITION.TOP_RIGHT
        })
    }).catch((err)=>{
        console.log(err)
        toast.error('Faild while add Product to Favorite.', {
            position: toast.POSITION.TOP_RIGHT
        })
    })

}

  return (
    <>

      <ToastContainer />

      {product &&
        <section>
          <div className="container">
            <div className="row my-5">
              <div className="section-title text-center">
                <h2 className="title title-icon-both">{t("Product View")}</h2>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12 col-md-6">
                <div className={`w-100 ${styles.product_zoom}`}>
                  <img className="w-100" src={`${product.photos[0]}`} alt={product.product_name} />
                </div>
              </div>

              <div className="col-12 col-md-5 offset-md-1">
                <div className={styles.product_info}>

                  <div className="product_rating">
                    <span className="spr-badge" id="spr_badge" data-rating={product.ratings_id.length}>
                      <span className="spr-starrating spr-badge-starrating">
                        <i className="spr-icon spr-icon-star" aria-hidden="true"></i>

                        {product.ratings_id.length >= 1 ?
                          <Rating className="rating" name="simple-controlled" value={rate} onChange={(e) => onUpdateRate(e)} /> : <Rating className='rating' name="simple-controlled" value={rate} onChange={(e) => onUpdateRate(e)} />
                        }

                      </span>
                      <span className="rating-caption ms-2">{product.ratings_id.length} {t("reviews")}</span>
                    </span>
                  </div>

                  <h3 className={`my-3 ${styles.product_title}`}>{product.product_name}</h3>
                  <div className={`fw-bold mb-3 ${styles.product_inventory}`}>
                    <span className={styles.inventory_title}>{t("Discount")}: </span> <span className={styles.variant_inventory}>{product.discount}%</span>
                  </div>

                  <div className={`price mt-2 mb-4 ${styles.product_price}`}>
                    <span className={`price fs-3 fw-bold me-2 ${styles.old}`}>
                      <span className="money">{product.price}</span>
                    </span>
                    <span className={`price fs-3 fw-bold ${styles.new}`}>
                      <span className="money">{product.price - (product.price * product.discount / 100)}</span>
                    </span>
                  </div>

                  <div className={`fw-bold mb-3 ${styles.product_inventory}`}>
                    <span className={styles.inventory_title}>{t("Owner")}: </span> <span className={styles.variant_inventory}>{product.created_by.user_name}</span>
                  </div>

                  <div className={`fw-bold mb-3 ${styles.product_inventory}`}>
                    <span className={styles.inventory_title}>{t("Shop Name")}: </span> <span className="variant-inventory">{product.created_by.shop_name}</span>
                  </div>

                  <div className={`fw-bold mb-3 ${styles.product_inventory}`}>
                    <span className={styles.inventory_title}>{t("Category")}: </span> <span className="variant-inventory">{product.categories_id[0]?.name}</span>
                  </div>

                  <div className={`fw-bold mb-3 ${styles.product_inventory}`}>
                    <span className={styles.inventory_title}>{t("Availability")}: </span> <span className="variant-inventory">{product.number_of_items}</span>
                  </div>

                  <div className={`mb-4 ${styles.product_desc}`}>{product.description}</div>

                  <div className={styles.product_buttons}>
                    <a className="action-wishlist btn btn-icon btn-outline btn-hover-dark">
                      <BsHeart className="fs-3" onClick={()=>addToFavorite(product._id)} />
                    </a>
                    <button type="submit" className="btn btn-dark btn-outline-hover-dark" id="AddToCart">  <AddItemToCart item={product} />  </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      }

      <section className="py-3">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="section-title text-center">
              <h2 className="title title-icon-both">{t("You Might Also Like")}</h2>
            </div>
          </div>

          <div className="products row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 mb-5 d-flex justify-content-center position-relative">

            {relatedProducts.map((product) => (
              <div key={product._id} className="col d-flex justify-content-center mb-3">
                <div className="product single-product">
                  <div className={`single-product__image d-flex align-items-center ${styles.product_thumb}`}>
                    <Link className="image image-wrap" to={`../product/${product._id}`}>
                      <img className={`responsive-image__image popup_cart_image w-100 ${styles.prod_img}`} src={`${product.photos[0]}`} alt={product.product_name} />
                      <div className={styles.product_badges}>
                        <span className={styles.onsale}>-{product.discount}%</span>
                      </div>
                    </Link>
                    <Link className={`wishlist ${styles.add_to_wishlist}`} data-hint="Add to wishlist" to="/">
                      <BsHeart className="fs-3" />
                    </Link>
                  </div>
                  <div className={`single-product__content text-center mt-3 ${styles.product_info}`}>
                    <h6 className="title popup_cart_title">
                      <Link to={`../product/${product._id}`}>{product.product_name}</Link>
                    </h6>
                    <span className={styles.price}>
                      <span id="product_current_price" className={`discounted-price ${styles.new}`}>
                        <span className="money">{product.price - (product.price * product.discount / 100)}LE</span>
                      </span>
                      <span className={`main-price discounted ${styles.old}`}>
                        <span className="money">{product.price}LE</span>
                      </span>
                      <div className="product-cart-action"></div>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  )
};

export default ProductView;