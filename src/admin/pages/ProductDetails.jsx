import React from 'react';
import ShowProduct from '../components/showProduct/ShowProduct';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    let { id } = useParams();
    return (
        <div>
            <div className='container'>
                <div className='AppGlass row'>
                    <Sidebar />
                    <ShowProduct prodId={id} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;