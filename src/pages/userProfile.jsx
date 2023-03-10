import React from 'react';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import { Link, Outlet } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";
import { SiWish } from "react-icons/si"

const UserProfile = () => {
    const navigate = useNavigate();
    let followers = 0;
    return (
        <div className='parent '>
            <div className='container  pt-4'>
                <div className='d-flex flex-wrap justify-content-center     justify-content-sm-start' >
                    <Avatar className='imageProfile mt-0 me-4' id='avatar' sx={{ width: 140, height: 140 }} alt="Remy Sharp" src="Images/1.jpg" />
                    <div>
                        <h4 className='mt-2 name'>Mousheraa</h4>
                        <p>{followers} Followers</p>
                        <Link className='edit-profile' href='/editProfile'>Edit public profile</Link>
                    </div>
                </div>
                <div className=' row  justify-content-center   justify-content-sm-start mt-3 col-12 '>
                    <div className='d-flex flex-column me-sm-2 nav-favorite'>
                        <button className="fav-link " onClick={() => navigate("/favorite")}>
                            <GrFavorite className='custom-icon' />
                        </button>
                        <span className='mt-3'>Favorite Items</span>
                    </div>
                    <div className='d-flex flex-column justify-content-start nav-wishlist '>
                        <button className="fav-link" onClick={() => navigate("/wishlist")}>
                            <SiWish className='custom-icon' />
                        </button>
                        <span className='mt-3'>Wishlist</span>
                    </div>

                </div>

            </div>
            <div className='mt-4'>
                <Outlet/>
            </div>
            
        </div>

    );
}

export default UserProfile;
