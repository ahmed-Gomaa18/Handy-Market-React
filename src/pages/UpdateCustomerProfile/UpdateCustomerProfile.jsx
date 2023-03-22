//
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import styles from './UpdateCustomerProfile.module.css'
import { useTranslation } from 'react-i18next';

const UpdateCustomerprofile = () => {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [imagesSrc, setImagePofile] = useState(null);
    const userToken = localStorage.getItem("user-token");
    const getUserDataURL = "https://handy-market-api.onrender.com/api/v1/user/getUserProfile";
    const userUlrUpdate = "https://handy-market-api.onrender.com/api/v1/user/updateUserWithProfile";
    const sorcImag = 'https://handy-market-api.onrender.com/api/v1/image';

    useEffect(() => {
        const userDataT = location.state;
        setUserData(userDataT)
        console.log(userDataT);
        // setImagePofile(location.state.profile_image);
    },[]);
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        switch (name) {
            case "user_name":
                setFormErrors({
                    ...formErrors, user_name: value.length >= 3 && value.length <= 20 ?
                        null :t("User Name must be at least 3 characters")
                })
                break;
            case "full_name":
                setFormErrors({
                    ...formErrors, full_name: value.length >= 3 && value.length <= 20 ?
                        null : t("Full Name must be at least 3 characters")
                })
                break;
            case "phone":
                setFormErrors({
                    ...formErrors, phone: value.length === 11 ?
                        null : t("Phone  must be 11 number")
                });
                break;
            case "city":
                setFormErrors({
                    ...formErrors, city: value.length >= 3 ?
                        null : t("City must be at least 3 characters")
                });
                break;
            case "street":
                setFormErrors({
                    ...formErrors, street: value.length >= 3 ?
                        null : t("Street must be at least 3 characters")
                });
                break;
            default:
                break;
        }

        if (name === "city" || name === "street" || name === "building_num") {
            const address = { ...userData.address, [name]: value }
            data = { ...userData, address }
        }
        else {
            data = { ...userData, [name]: value }
        }
        setUserData(data)
    }

    //updateData
    const updateData = (e) => {
        e.preventDefault();
        if (Object.values(formErrors).some((error) => {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            })
            return error !== null
        })) {
            return;
        }
        const formData = new FormData()
        if (userData.profile_image && userData.profile_image !== imagesSrc) {
            formData.append("profile_image", userData.profile_image);
        }

        if (userData.full_name)
            formData.append("full_name", userData.full_name)
        if (userData.phone)
            formData.append("phone", userData.phone);
        if (userData.user_name)
            formData.append("user_name", userData.user_name);

        if (userData.address.city && userData.address.street && userData.address.building_num) {
            formData.append("city", userData.address.city);
            formData.append("building_num", userData.address.building_num)
            formData.append("street", userData.address.street)
        }
        else {
            toast.error("Please fill in your address information to update your address", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        axios.patch(`${userUlrUpdate}`, formData, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((data) => {
            toast.success(data.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate("/CustomerProfile")
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong !!! ", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
    const handleImageChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.files[0] })
    }
    return (
        <>

             <div className="m-5 py-5 rounded shadow">
                <div className="row">
                   <div className='offset-lg-1 shadow-lg my-5 rounded col-md-4 pe-lg-5'>
                        <div className={`h-100 ${styles.layer}`}>
                            <img src="/images/Update-pana.png" className="img-fluid h-100" alt="user img" />
                        </div>

                    </div>
                    <div className='col-md-6 ps-lg-5 mx-5'>
                        <div className="row w-100">
                        <form onSubmit={updateData} className="FormData  d-flex flex-column align-items-center col-12 col-6 ">

                          {userData.profile_image &&<Avatar className='imageProfile p-0' id='avatar' sx={{ width: 170, height: 140 }} alt="your Image" src={`${sorcImag}${userData.profile_image}`} />}
                         <div className="mb-3  d-flex flex-column align-items-center col-md-12 col-sm-8">
                         <label htmlFor="profileImage" className="form-label fs-6 text-muted">{t("Profile Image:")}</label>
                         <input type="file"  name="profile_image" className="form-control  mt-1" accept="image/*" id="profileImage" onChange={handleImageChange} />
                         </div>

                         <div className="mb-3 d-flex col-md-12 col-sm-8">
                              <label htmlFor="userName" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("User Name")}</label>
                              <input type="text" className="form-control is-valid" id="userName" placeholder="User Name" required minLength="3" maxLength="20" name="user_name" value={userData?.user_name} onChange={handleChange} />
                         </div>
                         {formErrors?.user_name && <div className="h6 pb-2 text-danger border-bottom border-danger text-center">{formErrors.user_name}</div>}
                          <div className="mb-3 d-flex col-md-12 col-sm-8  ">
                             <label htmlFor="fullName" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("Full Name")}</label>
                             <input type="text" className="form-control is-valid" id="fullName" placeholder="Full Name" required minLength="3" maxLength="20" name="full_name" value={userData?.full_name} onChange={handleChange} />
                         </div>
                         {formErrors?.full_name && <div className="h6 pb-2 mb-2 text-danger border-bottom border-danger text-center">{formErrors.full_name}</div>}
                         <div className=" mb-3 d-flex col-md-12 col-sm-8 ">
                              <label htmlFor="phone" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("Phone")}</label>
                              <input type="text" className="form-control is-valid" id="phone" placeholder="Phone" required minLength="11" maxLength="11" name="phone" value={userData?.phone} onChange={handleChange} />
                         </div>
                       {formErrors.phone && <div className="h6 pb-2 mb-2 text-danger border-bottom border-danger text-center">{formErrors.phone}</div>}
                        <div className="mb-3 d-flex col-md-12 col-sm-8 ">
                           <label htmlFor="city" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("City")}</label>
                           <input type="text" className="form-control is-valid " id="city" placeholder="City" minLength="3" maxLength="20" name="city" value={userData?.address?.city} onChange={handleChange} />
                       </div>
                        {formErrors.city && <div className="h6 pb-2 mb-2 text-danger border-bottom border-danger text-center">{formErrors.city}</div>}
                       <div className="mb-3 d-flex col-md-12 col-sm-8 ">
                          <label htmlFor="street" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("Street")}</label>
                          <input type="text" className="form-control is-valid " id="street" placeholder="Street" minLength="3" maxLength="20" name="street" value={userData?.address?.street} onChange={handleChange} />
                     </div>
                      {formErrors.street && <div className="h6 pb-2 mb-2 text-danger border-bottom border-danger text-center">{formErrors.street}</div>}

                    <div className="mb-3 d-flex col-md-12 col-sm-8 ">
                      <label htmlFor="buildingNum" className="labelUpdateUser form-label col-md-2 col-sm-2  mt-1 me-1">{t("Building")}</label>
                      <input type="Number" className="form-control is-valid" id="buildingNum" placeholder="Building Number" name="building_num" value={userData?.address?.building_num} onChange={handleChange} />
                 </div>
                   <div className=" mb-3 d-flex col-md-12 col-sm-8 justify-content-center">
                       <button type="submit" className={`btn m-2  col-md-6 px-l-5 px-3 ${styles.btn_clear}`} variant='btn btn-outline-primary'>
                            {t("Update")}
                      </button>
                  </div>
           </form>

                        </div>

                    </div>

                </div>
             </div>

                <div>
                    <ToastContainer />
                </div>
        </>
    );
}

export default UpdateCustomerprofile;
