import React from 'react';
import Cards from '../cards/Cards';
import Table  from '../Table/Table';
import styles from  "./_maindash.module.css";
// import CustomerReview from "../CustomerReview/CustomerReview";
const MainDash = () => {
    return (
    <>
        <div className='{styles.MainDash} col-lg-10 col-md-9'>
            <div className="row">
                <div className='col-8 mt-3'>
                 <Cards />
                </div>
                {/* <div className='col-4'>
                 <h3>Customer Review</h3>
                 <CustomerReview />
                 </div> */}

                 <div >
                   <Table/>
                </div>
            </div>
                     
        </div>
        
        
    </>
    );
};

export default MainDash;