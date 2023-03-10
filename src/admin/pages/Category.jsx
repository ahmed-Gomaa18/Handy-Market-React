import React from 'react';
import Sidebar from "./../components/sidebar/Sidebar";
import CategoryTable from "./../components/categoryTable/CategoryTable";
import './dashstyle.css';

const Category = () => {
    return (
        <div className='maincontainer container-fluid'>
            <div className='AppGlass row p-5 '>
                <Sidebar />
                <CategoryTable />
            </div>
        </div>
    );
};

export default Category;