import React from 'react';
import MainDash from '../components/maindash/MainDash';
import Sidebar from '../components/sidebar/Sidebar';
import './dashstyle.css';

const Dashboard = () => {
    return (
        <div className='maincontainer container-fluid'>
            <div className='AppGlass row p-5 '>
                <Sidebar />
                <MainDash />
            </div>
        </div>
    );
};

export default Dashboard;