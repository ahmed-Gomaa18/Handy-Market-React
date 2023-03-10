import React from 'react';
import Avatar from '@mui/material/Avatar';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"

const NoFavORwish = () => {
    return (
        <div className='d-flex container justify-content-center'>
            <div className='notfoundFav d-flex flex-column align-items-center'>
                <Avatar className='imageNofound  me-4' id='avatar' sx={{ width: 120, height: 120 }} alt="Remy Sharp">
                    <img src='Images/icon-edit.png'/>
                </Avatar>
                <h2>Nothing to see here yet</h2>
                <p>Start favoriting items to compare, shop, and keep track of things you love.</p>
            </div>
        </div>
    );
}

export default NoFavORwish;
