import { MdLocationOn, MdBusinessCenter, MdOutlineStarRate } from "react-icons/md"
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import { NavLink, Outlet } from 'react-router-dom';
import axios from "axios";

const SellerProfile = () => {
  const [userData, userState] = useState({});
  const sorcImag = 'http://localhost:3000/api/v1/image';

  let userToken = localStorage.getItem("user-token");

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/getUserProfile',
      {
        headers: { "Authorization": `Bearer ${userToken}` }
      }).then((data) => {
        let Data = data.data.user;
        userState(Data);
      })
  }, []);

  return (
    <>
      {userData && <div className='parent'>
        <div className='d-flex  container-fluid justify-content-evenly ms-sm-0 justify-content-md-around' id="container">
          <div className='col-12 col-sm-12 col-md-4  d-flex flex-column  align-items-center pb-4 mb-4' id="profileSection">

            {userData.profile_image && 
            <Avatar className='imageProfile' id='avatar' sx={{ width: 140, height: 140 }} alt="your image" src={`${sorcImag}${userData.profile_image}`} />

            }

            {userData.full_name && <h4 className='mt-2 name'>{userData.full_name}</h4>}

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

            <Link className='edit-profile mt-4' to='../editProfile' state={userData}>Edit public profile</Link>

            {userData.description &&
              <div className='ms-4 mt-5'>
                <h4 >About Me</h4>
                <p className='description'>{userData.description}</p>
              </div>
            }

          </div>

          <div id='workSection' className='col-11 col-sm-11 col-md-7 d-flex flex-column'>
            <div className='ms-1 row justify-content-evenly col-12 '>
              <ul className="nav nav-pills ms-4 mb-3 justify-content-center justify-content-sm-start " id="pills-tab" role="tablist">
                <li className='mb-2' role="presentation">
                  <Link className=" custom" to="/seller/services">My Services</Link>
                </li>
              </ul>
            </div>
            <div className='row justify-content-center   justify-content-sm-evenly '>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      }
    </>

  );
};

export default SellerProfile;