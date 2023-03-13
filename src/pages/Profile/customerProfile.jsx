import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../node_modules/bootstrap/dist/js/bootstrap"
// import "../styles/profile.style.css";
import { MdLocationOn } from "react-icons/md"
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from "react-icons/md"
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import Avatar from '@mui/material/Avatar';
import Wishlist from "./user.wishlist"
import Favorites from "./user.favorites"
import { useState, useEffect } from "react"
import CustomerOrders from "./customer.orders"
import axios from "axios";
// import "../styles/profile.style.css"
import "../styles/customerProfile.css"
const CustomerProfile = () => {
    const [userData, userState] = useState({});
    const sorcImag = 'http://localhost:3000/api/v1/image';
    let userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/getUserProfile',{ 
            headers: { "Authorization": `Bearer ${userToken}` } 
             }).then((data) => {
             var Data = data.data.user;
             userState(Data);
        })
    }, []);
      
    return (
        <>
            {userData && <div className='parent '>
                <div className='d-flex  container-fluid justify-content-evenly ms-sm-0 justify-content-md-around' id="container">
                    <div className='col-12 col-sm-12 col-md-4  d-flex flex-column  align-items-center pb-4 mb-4' id="profileSection">
                        <Avatar className='imageProfile' id='avatar' sx={{ width: 140, height: 140 }} alt="your image" src={`${sorcImag}${userData.profile_image}`} />
                        {userData.full_name && <h4 className='mt-2 name'>{userData.full_name}</h4>}
                        {userData.address?.city && <div className='d-flex mt-3  justify-content-center'>
                            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                <MdLocationOn />
                            </IconContext.Provider>
                            <p className='ms-2 address '>{userData.address.city}, {userData.address.street} ,{userData.address.building_num}</p>
                        </div>
                        }
                        {
                            userData.email && <div className='d-flex mt-3  justify-content-center'>
                                <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                    < MdEmail />
                                </IconContext.Provider>
                                <p className=' ms-2 job  mb-0'>{userData.email}</p>
                            </div>
                        }
                        {userData.phone &&
                            <div className='d-flex mt-3  justify-content-center'>
                                <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                    < BsFillTelephoneFill />
                                </IconContext.Provider>
                                <p className=' ms-2 job  mb-0'>{userData.phone}</p>
                            </div>
                        }
                        <Link className='edit-profile mt-4' to='/customerUpdateProfile'>Edit public profile</Link>
                        {userData.description &&
                            <div className='ms-4 mt-5'>
                                <h4 >About Me</h4>
                                <p className='description'>{userData.description}</p>
                            </div>
                        }
                    </div>
                    <div id='workSection' className='col-11 col-sm-11 col-md-7 d-flex flex-column'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item " role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Favorites</button>     </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Orders</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">wishlist</button>
                            </li>
                        </ul>
                        <div className="tab-content " id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <Favorites/>
                            </div>
                            <div className="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <CustomerOrders />
                            </div>
                            <div className="tab-pane fade " id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                 <Wishlist />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}
export default CustomerProfile;

