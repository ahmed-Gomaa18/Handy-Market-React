import { MdLocationOn,MdBusinessCenter,MdOutlineStarRate } from "react-icons/md"
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdEmail} from "react-icons/md"
import { Link} from 'react-router-dom';
import { IconContext } from "react-icons";
import Avatar from '@mui/material/Avatar';
import { NavLink, Outlet} from 'react-router-dom';
import {useEffect,useState} from "react"
import axios from "axios";

const Profile = () => {  
   const [userData,userState]=useState(null);

  const sorcImag = 'http://localhost:3000/api/v1/image';
  
  
  let userToken=localStorage.getItem("user_token")
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/getUserProfile',{headers:{"Authorization":`Bearer ${userToken}`}}).then((data)=>{
       var Data=data.data.user;
       console.log(Data)
       userState(Data);
  })},[]);

 const handleEmailClick=()=>{
  // window.open('mailto:email@example.com?subject=Subject&body=Body%20goes%20here')
 }
  return (
    <>
     {userData && <div className='parent '>
      <div className='d-flex  container-fluid justify-content-evenly ms-sm-0 justify-content-md-around' id="container">
        <div className='col-12 col-sm-12 col-md-4  d-flex flex-column  align-items-center pb-4 mb-4' id="profileSection">
          <Avatar className='imageProfile' id='avatar' sx={{ width: 140, height: 140 }} alt="Remy Sharp" src={`${sorcImag}${userData.profile_image}`} />
          <h4 className='mt-2 name'>{userData.full_name}</h4>
          <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
              <MdBusinessCenter />
            </IconContext.Provider>
            <p className=' ms-2 job  mb-0'>{userData.shop_name}</p>
          </div>
          <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider  value={{color:"yellow", size: '23px' }}>
              <MdOutlineStarRate />
            </IconContext.Provider>
            <p className='ms-2 rating '>4.6</p>
          </div>
          <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
              <MdLocationOn />
            </IconContext.Provider>
            <p className='ms-2 address '>{userData.address.city}, {userData.address.street} ,{userData.address.building_num}</p>
          </div>
          {/* <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
              <MdOutlinePersonOutline />
            </IconContext.Provider>
            <p className='ms-2 address '>Novosibirsk, Russian Federation</p>
          </div> */}
           <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
              < MdEmail />
            </IconContext.Provider>
            <p className=' ms-2 job  mb-0'>{userData.email}</p>
          </div>

          <div className='d-flex mt-3  justify-content-center'>
            <IconContext.Provider value={{ color: '#696969', size: '18px' }}>
              < BsFillTelephoneFill />
            </IconContext.Provider>
            <p className=' ms-2 job  mb-0'>{userData.phone}</p>
          </div>
          <Link className='edit-profile mt-4' to='/editProfile'>Edit public profile</Link>
          {/* <div className='btnContainer row justify-content-evenly'>
            <Button className='follow_btn col-sm-5   col-sx-10  mt-4' variant='btn btn-outline-primary'>
            <IconContext.Provider className="mr-2 mb-3" value={{ size: '18px'}}>
                <IoMdAddCircleOutline className="mb-1 me-3" />
              </IconContext.Provider>
              Follow</Button>
            <Button className='message_btn col-sm-5 col-sx-10 mt-4 ' variant='btn btn-outline-primary' onClick={handleEmailClick}>
              <IconContext.Provider value={{ size: '18px' }}>
                <TfiEmail  className="mb-1 me-3"/>
              </IconContext.Provider >
               Message
            </Button>
          </div> */}

          <div className='ms-4 mt-5'>
            <h4 >About Me</h4>
            <p className='description'>{userData.description}</p>
          </div>
        </div>
        <div id='workSection' className='col-11 col-sm-11 col-md-7 d-flex flex-column'>
          <div className='ms-1 row justify-content-evenly col-12 '>
            <ul className="nav nav-pills ms-4 mb-3 justify-content-center justify-content-sm-start " id="pills-tab" role="tablist">
              <li className='mb-2' role="presentation">
                <NavLink className=" custom" to="/" >My Services</NavLink>
              </li>
              {/* <li  role="presentation">
                <NavLink className="  custom" to="addNewService" >New services</NavLink>
              </li> */}
            </ul>
          </div>
          <div className='row justify-content-center   justify-content-sm-evenly '>
            <Outlet/>
          </div>
        </div>
      </div>    
    </div>
    }
    </>
    
  );
};

export default Profile;

 // const url="http://localhost:3000/api/v1/user/getUserProfile";
