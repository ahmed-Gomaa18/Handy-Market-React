import React from 'react';
import BalanceTable from '../components/balanceTable/BalanceTable';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';

const BalanceData = () => {
    return (
        <div className='maincontainer container-fluid'>
            <div className='AppGlass row p-5 '>
                <Sidebar />
                <BalanceTable />
            </div>
        </div>
    );
};

export default BalanceData;