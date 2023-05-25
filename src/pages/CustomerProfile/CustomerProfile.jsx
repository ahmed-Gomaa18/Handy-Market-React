import React, { useState, useEffect } from 'react';
import { MdLocationOn } from "react-icons/md"
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from "react-icons/md"
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import Avatar from '@mui/material/Avatar';
import Wishlist from '../../components/Wishlist/Wishlist';
import Favorites from '../../components/Favorites/Favorites';
import OrderList from '../../components/OrderList/OrderList';
import axios from "axios";
import styles from './CustomerProfile.module.css';
import { useTranslation } from 'react-i18next';

const CustomerProfile = () => {
    const { t, i18n } = useTranslation();
    const [userData, userState] = useState({});
    //const sorcImag = 'http://localhost:3000/api/v1/image';
    let userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get('https://handy-market-api.onrender.com/api/v1/user/getUserProfile', {
            headers: { "Authorization": `Bearer ${userToken}` }
        }).then((data) => {
            var Data = data.data.user;
            console.log(data);
            userState(Data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    return (
        <>
            {userData && <div className='parent my-5 '>
                <div className={`m-5 container m-auto p-4 shadow-lg`} id="container">
                    <div className="row">

                        <div className={`col-md-4  shadow rounded p-4 `} id="profileSection">
                            <div className="row m-auto text-center">
                                <div className=' w-50 h-50 m-auto' >
                                    {userData.profile_image && <Avatar className="img-fluid w-100 h-100 m-auto shadow" id='avatar' alt="your image" src={`${userData.profile_image}`} />}
                                </div>

                                {userData.full_name && <h4 className='mt-3 name'>{userData.full_name}</h4>}
                                <div className='px-5' >
                                    <hr className='text-primary ' />
                                </div>
                                {userData.address?.city && <div className='d-flex  '>
                                    <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                        <MdLocationOn />
                                    </IconContext.Provider>
                                    <p className='ms-2 address '>{userData.address.city}, {userData.address.street} ,{userData.address.building_num}</p>
                                </div>
                                }

                                {
                                    userData.email && <div className='d-flex p-3 '>
                                        <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                            < MdEmail />
                                        </IconContext.Provider>
                                        <p className=' ms-2 job  mb-0'>{userData.email}</p>
                                    </div>
                                }
                                {userData.phone &&
                                    <div className='d-flex p-3'>
                                        <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                                            < BsFillTelephoneFill />
                                        </IconContext.Provider>
                                        <p className=' ms-2 job  mb-0'>{userData.phone}</p>
                                    </div>
                                }
                                <Link to="/editCustomerProfile" state={userData}>

                                    <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">

                                    {t("Edit public profile")}
                                    </button>
                                </Link>

                                {userData.description &&
                                    <div className='ms-4 mt-5'>
                                        <h4 >{t("About Me")}</h4>
                                        <p className='description'>{userData.description}</p>
                                    </div>
                                }
                            </div>

                        </div>

                        <div id='workSection' className='col-md-8  p-4'>
                            <div className=''>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item " role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">{t("Favorites")}</button>     </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{t("Orders")}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">{t("Wishlist")}</button>
                                    </li>
                                </ul>
                                <div className="tab-content " id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <Favorites />
                                    </div>
                                    <div className="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <OrderList />
                                    </div>
                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <Wishlist />
                                    </div>
                                </div>
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

