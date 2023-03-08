import React from 'react';
import ProductTable from '../components/productTable/ProductTable';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';

const ProductData = () => {
    return (
        <div className='maincontainer container-fluid'>
            <div className='AppGlass row p-5 '>
                <Sidebar />
                <ProductTable />
            </div>
        </div>
    );
};

export default ProductData;