import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../styles/updateUserProfile.css";
// fullname phone address city street  building_num shop_name user_name
import axios from "axios";

const UpdateUserProfile = () => {
    const navigate=useNavigate();
    const [userData, setUserData] = useState({ user_name: "", full_name: "", phone: "", shop_name: "",address:{} });

    const userToken = localStorage.getItem("userToken");
    //url    endpoint get user  data
    const getUserDataURL = "http://localhost:3000/api/v1/user/getUserProfile";
      //url    endpoint  update data
   const userUlrUpdate="http://localhost:3000/api/v1/user/updateUser";

    // get Data
    useEffect(() => {
        axios.get(getUserDataURL, { headers: { "authorization": `Bearer ${userToken}`} }).
            then((data) => {
                var userData = data.data.user;
                console.log(userData)
                setUserData({... userData })
            }).catch((error) => {
                console.log(error)
            })
    }, [])
    const handleFileSelect = () => {

    }
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let data={};
        if (name === "building_num")
            value = +value;
        if(name=="city"||name==="street"||name==="building_num"){
            const address={...userData.address,[name]:value}
            data={...userData,address}
        }
        else
        {
            data = { ...userData, [name]: value }
        }
        console.log(data);
        setUserData(data)
        console.log(userData)
    }

    //updateData
    const updateData=()=>{
      
    //update user data     
        const {user_name,full_name,phone,address,shop_name} =userData;
        const obj={user_name,full_name,address,phone,shop_name};
    
        console.log(obj);
         axios.patch(`${userUlrUpdate}`,obj,{headers:{"Authorization":`Bearer ${userToken}`,'Content-Type': 'application/json'}})
         .then((data)=>{
            // console.log(data.data)
          
            alert(data.data.message)
              navigate(`/`)
            }).catch((error)=>{
             console.log("............")
             console.log(error)
            })
    }

    //{`${sorcImag}${userData.profile_image}`}
    return (
        <>
            <div className='container d-flex flex-column align-items-center DataContainer '>
                <form className="was-validated FormData  d-flex flex-column align-items-center col-12 col-6 ">
                    {/* //upload image */}
                    <Avatar className='imageProfile p-0' id='avatar' sx={{ width: 170, height: 140 }} alt="Remy Sharp" src="Images/profileImage.png" />
                    <div className="mb-3  d-flex flex-column align-items-center col-12 col-sm-8">
                        <input type="file" className="form-control mt-1" accept="image/*" aria-label="upload your photo" required onChange={handleFileSelect} />
                        <div className="invalid-feedback">upload your photo</div>
                    </div>

                    <div className=" mb-3 d-flex  col-12 col-sm-8 ">
                        <label htmlFor="validationServer01" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">User Name</label>
                        <input type="text" className="form-control  is-valid" id="validationServer01" placeholder="User Name" required minLength="3" maxLength="10" name="user_name" value={userData?.user_name} onChange={handleChange} />
                    </div>

                    <div className=" mb-3 d-flex col-12 col-sm-8 ">
                        <label htmlFor="validationServer02" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">Full Name</label>
                        <input type="text" className="form-control is-valid " id="validationServer02" placeholder="Full Name" required minLength="3" maxLength="20" name="full_name" value={userData?.full_name} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8 ">
                        <label htmlFor="validationServer03" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">Phone</label>
                        <input type="text" className="form-control is-valid " id="validationServer03" placeholder="Phone" required minLength="11" maxLength="11" name="phone" value={userData?.phone} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8 ">
                        <label htmlFor="validationServer04" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">Shop Name</label>
                        <input type="text" className="form-control is-valid " id="validationServer04" placeholder="Shop Name" required minLength="3" maxLength="20" name="shop_name" value={userData?.shop_name} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8  ">
                        <label htmlFor="validationServer05" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">City</label>
                        <input type="text" className="form-control is-valid " id="validationServer05" placeholder="City" required minLength="3" maxLength="20" name="city" value={userData?.address?.city} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8 ">
                        <label htmlFor="validationServer06" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">Street</label>
                        <input type="text" className="form-control is-valid " id="validationServer06" placeholder="Street" required minLength="3" maxLength="20" name="street" value={userData?.address?.street} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8 ">
                        <label htmlFor="validationServer07" className="labelUpdateUser form-label col-4 col-sm-2  mt-1 me-1">Building</label>
                        <input type="Number" className="form-control is-valid " id="validationServer07" placeholder="Building Number" required name="building_num" value={userData?.address?.building_num} onChange={handleChange} />
                    </div>
                    <div className=" mb-3 d-flex col-12 col-sm-8 justify-content-center">
                        <Button className='message_btn col-sm-5 col-sx-10 mt-2 ' variant='btn btn-outline-primary' onClick={updateData}>
                           Upadate
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default UpdateUserProfile;//     const obj={user_name:"mosh",
//     full_name :"mousheraa gomaa abd eltwab", 
//     address:{
//        city:"cairo",
//    street:"elmadbh",
//        building_num:5
//     }, 
//     phone:"01011101010",
//     shop_name:"my new work"
//     }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDRiYTFjM2E5ZGY1MWZiNzgxYzA2ZiIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY3ODI3NTUxMiwiZXhwIjoxNjc4MzYxOTEyfQ.zEozKXGAOsZMAYa3sKCcIYa9Tp_Vg9FTt2mMC10aEc4
