import React from 'react';
import AllProductDetails from '../components/allproductdetails/AllProductDetails';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';
import { useParams } from 'react-router-dom';
const AllProductsdetails = () => {
    let { id } = useParams();
    return (
        <div>
            <div className='container'>
                <div className='AppGlass row '> 
                    <Sidebar/>
                    <AllProductDetails prodId={id}/>

                </div>
            </div> 
        </div>
    );
};

export default AllProductsdetails;

