import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import UsersTable from '../components/usersTable/UsersTable';
import './dashstyle.css';

const UserData = () => {
    return (
        <div className='maincontainer container-fluid'>
            <div className='AppGlass row p-5 '>
                <Sidebar />
                <UsersTable />
            </div>
        </div>
    );
};

export default UserData;