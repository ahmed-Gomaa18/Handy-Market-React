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
                <div className='col-lg-4 mt-5'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="categoryname">Category Name</label>
                            <input type="text" className="form-control" id="categoryname" name='categoryname' placeholder="Enter Category name" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Category;