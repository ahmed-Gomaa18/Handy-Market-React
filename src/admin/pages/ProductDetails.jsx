import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';
const ProductDetails = () => {

    return (
        <div>
            <div className='maincontainer'>
                <div className='AppGlass'> 
                    <Sidebar/>

                </div>
           
            </div>
            {/* `http://localhost:3000/api/v1/product/admin/notApproval/${row._id}` */}
        </div>
    );
};

export default ProductDetails;