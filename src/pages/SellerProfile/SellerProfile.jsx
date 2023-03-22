import { MdLocationOn, MdBusinessCenter, MdOutlineStarRate } from "react-icons/md"
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import { NavLink, Outlet } from 'react-router-dom';
import axios from "axios";
import styles from './SellerProfile.module.css';
import { useTranslation } from 'react-i18next';

const SellerProfile = () => {
  const { t, i18n } = useTranslation();
  const [userData, userState] = useState({});
  const sorcImag = 'https://handy-market-api.onrender.com/api/v1/image';

  let userToken = localStorage.getItem("user-token");

  useEffect(() => {
    axios.get('https://handy-market-api.onrender.com/api/v1/user/getUserProfile',
      {
        headers: { "Authorization": `Bearer ${userToken}` }
      }).then((data) => {
        let Data = data.data.user;
        userState(Data);
      })
  }, []);

  return (
    <>
      {userData && <div className='parent my-5'>
        <div className={`m-5 container ${styles.mainColor} p-5 m-auto text-center shadow-lg`} id="container">
          <div className="row">
            <div className={`col-md-6   m-2 mx-auto shadow rounded p-4`}>
              <div className="row m-auto text-center">
                <div className=' w-50 h-50 m-auto' >
                  {userData.profile_image &&
                    <Avatar className='img-fluid w-100 h-100 m-auto shadow' id='avatar' alt="your image" src={`${sorcImag}${userData.profile_image}`} />
                  }
                </div>

              </div>

              {userData.full_name && <h4 className='mt-2 name '>{userData.full_name}</h4>}
              {userData.shop_name && <div className='d-flex mt-3 justify-content-center'>
                <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                  <MdBusinessCenter />
                </IconContext.Provider>
                <p className=' ms-2 job  mb-0'>{userData.shop_name}</p>
              </div>
              }

              {userData.address?.city && <div className='d-flex mt-3 justify-content-center'>
                <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
                  <MdLocationOn />
                </IconContext.Provider>
                <p className='ms-2 address'>{userData.address.city}, {userData.address.street} ,{userData.address.building_num}</p>
              </div>
              }

              {userData.email && <div className='d-flex mt-3  justify-content-center'>
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

              <div>
                <Link className='edit-profile mt-4' to='../editProfile' state={userData}><button className={`${styles.mybtn}`} >{t("Edit public profile")}</button ></Link>
              </div>
              <div>


                <Link className="custom" to="/seller/services"> 
                  <button className={`${styles.btn2}`}>  {t("Products")}</button>

                 
                </Link>
              </div>

              {userData.description &&
                <div className='ms-4 mt-5'>
                  <h4 >{t("About Me")}</h4>
                  <p className='description'>{userData.description}</p>
                </div>
              }

            </div>





          </div>
        </div>

      </div>
      }
    </>

  );
};

export default SellerProfile;