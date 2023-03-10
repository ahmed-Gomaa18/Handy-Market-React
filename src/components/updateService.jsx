import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import "../styles/updateservice.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";


// http://localhost:3000/api/v1/product/seller/:sellerId/update/:prprooductId


const UpdateService = (props) => {
    const routeParams = useParams();
    const deleteItem=props.deleteItem
    const productId = routeParams['id'];
    const userId=routeParams['userId'];
    const [productData, setProductsState] = useState({Data:null})

    // console.log(productId)
    // console.log(userId)
    const navigate = useNavigate(); 
    const ProductUrl = "http://localhost:3000/api/v1/product/";
    const sorcImag = 'http://localhost:3000/api/v1/image';
    const productUpdateUrl=" http://localhost:3000/api/v1/product/seller/"
    /// for delete    
    const ProductUrlDelete=`http://localhost:3000/api/v1/product/seller/`;

 const userToken=localStorage.getItem("userToken");
    useEffect(() => {
        axios.get(`${ProductUrl}${productId}`).then((data) => {
            var test = data.data.product;
            console.log(test)
            setProductsState({Data:test});
        })
    }, []);

    function handleFileSelect(event) {
       console.log(event.target.value) 
    }
    const handleDelete=()=>{
         axios.delete(`${ProductUrlDelete}${userId}/delete/${productId}`,{headers:{"authorization":`Bearer ${userToken}`}})
         .then((data)=>{
            var test=data.data;
            alert(test.message);
            // deleteItem={DeleteItem}
        //  deleteItem(productId)
         navigate(`/`)

            });
    }
   const handleUpdate=async ()=>{
    const {product_name,sold_items,discount,price,number_of_items,description} =productData.Data
        const obj={product_name,sold_items,discount,price,number_of_items,description};
    console.log(obj)
    await axios.patch(`${productUpdateUrl}${userId}/update/${productId}`,obj,{headers:{"Authorization":`Bearer ${userToken}`,'Content-Type': 'application/json'}})
        .then((data)=>{
        console.log(data.data.product)
        alert(data.data.message)
            navigate(`/`)
        }).catch((error)=>{
            console.log(error)
       })
   }
   const handleDataChange=(event)=>{
       let name=event.target.name;
       let value=event.target.value;
        if(name=="sold_items"||name=="price"||name=="discount"||name=="number_of_items")
            value=+value;
         const allData={...productData.Data,[name]:value}
         setProductsState({Data:allData})
   }
    return (

        <div className='d-flex flex-column align-items-center ' >
            <div className='col-12 col-sm-8 divImages d-flex justify-content-center '>
               {productData.Data?.photos[0] && <img className='smallImage' src={`${sorcImag}${productData.Data?.photos[0]}`} />} 
                
               {/* <input className='mt-4' type="file" accept="image/*" onChange={handleFileSelect}/> */}
            </div>
            <div className='container mt-4 align-items-center '>
                <div className='mb-3 row  justify-content-center'>
                    <div className='col-5 col-sm-2'>
                        <label className='labelUpdateService' htmlFor="Name">Name</label>
                    </div>
                    <div className='col-7'>
                       <input type="text" id="Name" className="form-control col-auto" name='product_name' value={productData.Data?.product_name} onChange={handleDataChange}/>
                    </div>
                </div>
                <div className='mb-3 row  justify-content-center'>
                    <div  className='col-5 col-sm-2'>
                        <label  htmlFor="solid" className='labelUpdateService'>Solid Items</label>
                    </div>
                    <div className='col-7'>
                        <input type="text" id="solid" className="form-control col-auto" name='sold_items' value={productData.Data?.sold_items} disabled />
                    </div>
                </div>
                <div className='mb-3 row  justify-content-center'>
                    <div  className='col-5 col-sm-2'>
                        <label className='labelUpdateService'htmlFor="price" >Price</label>
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
                        <input type="text" id="discount" className="form-control" name='discount' value={productData.Data?.discount} onChange={handleDataChange}/>
                    </div>
                </div>
                <div className='mb-3 row  justify-content-center'>
                    <div className='col-5 col-sm-2'>
                        <label htmlFor="itemsAvailable" className='labelUpdateService'>available Items</label>
                    </div>
                    <div  className='col-7'>
                        <input type="text" id="itemsAvailable"className="form-control" name='number_of_items' value={productData.Data?.number_of_items}  onChange={handleDataChange}/>
                    </div>
                </div>
                <div className='mb-3 row  justify-content-center'>
                    <div className='col-5 col-sm-2'>
                        <label htmlFor="description"  className='labelUpdateService'>Description</label>
                    </div>
                    <div className='col-7'>
                         <textarea type="text" id="description" className="form-control" name='description' value={productData.Data?.description} onChange={handleDataChange} />
                    </div>
                </div>
                <div className='mb-3 row  justify-content-evenly'>
                     <Button className='follow_btn col-sm-4  col-sx-10  mt-4' variant='btn btn-outline-primary'  onClick={handleUpdate}>Update</Button>
                    <Button className='follow_btn col-sm-4  col-sx-10  mt-4' variant='btn btn-outline-primary' onClick={handleDelete}>Delete</Button>
                </div>
            </div>
            
        </div>
    );
}

export default UpdateService;
// http://localhost:3000/api/v1/product/seller/6404ba1c3a9df51fb781c06f/update/64065e075bbca500ca2ddec7