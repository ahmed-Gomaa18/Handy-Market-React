import { useState } from "react";
import axios from "axios";
import styles from './Register.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import Swal from "sweetalert2";

const Register = () => {

    const { t } = useTranslation();

    const [form, setForm] = useState({
        user_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        address: {
            city: "",
            street: "",
            building_num: "",
        },
        gender: "",
        role: "Customer",
        phone: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMssg, seterrMssg] = useState();

    const UpdateAddress = e => {
        form.address.building_num = +form.address.building_num;
        setForm((prev) => {
            return {
                ...prev, address: {
                    ...prev.address,
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    const onUpdateField = e => {
        form.age = +form.age;
        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        }
        );
    };
    const onHandleBlur = e => {
        const { name, value } = e.target;
        validate(name, value)
    }
    const validate = (name, value) => {
        if (!value) {
            setFormErrors({ ...formErrors, [name]: `Please, Enter required ${name}. ` })
            return
        };
        switch (name) {
            case "user_name":
                {
                    if (value.length <= 3) {
                        setFormErrors({ ...formErrors, user_name: 'username should be more than three digits' });
                    } else if (value.length >= 20) {
                        setFormErrors({ ...formErrors, user_name: 'username maximum 20 digits' });
                    } else {
                        setFormErrors({ ...formErrors, user_name: null });
                    }
                }
                break;

            case "email":
                {
                    if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i).test(value)) {
                        setFormErrors({ ...formErrors, email: 'please check your email' });
                        //return
                    } else {
                        setFormErrors({ ...formErrors, email: null });
                    }
                }
                break;

            case "age":
                {
                    setFormErrors({ ...formErrors, age: value <= 15 ? 'users age should be fifteen years old or more' : null });
                }
                break;
            case "password":
                {
                    if (value.length < 6) {
                        setFormErrors({ ...formErrors, password: 'Your password should be more than 6 digits' });
                    } else if (value.length > 16) {
                        setFormErrors({ ...formErrors, password: 'Your password shouldnt exceed 16 digits' });
                    } else if (!new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(value)) {
                        setFormErrors({ ...formErrors, password: 'Your password should contain at least one number and one special character' });
                    } else {
                        setFormErrors({ ...formErrors, password: null });
                    }
                }
                break;
            case "confirmPassword":
                {
                    if (form.password !== value) {
                        setFormErrors({ ...formErrors, confirmPassword: 'Your password is miss match ' });
                    } else {
                        setFormErrors({ ...formErrors, confirmPassword: null });
                    }

                }
                break;


            case "phone":
                {
                    if (!new RegExp(/^\d{11}$/).test(value)) {
                        setFormErrors({ ...formErrors, phone: 'phone must be number of eleven digits' });
                    } else if (value.length !== 11) {
                        setFormErrors({ ...formErrors, phone: 'phone must be eleven digits' });
                    } else {
                        setFormErrors({ ...formErrors, phone: null });
                    }
                }
                break;

            case "city":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, city: 'city is required ' });

                    } else {
                        setFormErrors({ ...formErrors, city: null });
                    }
                }
                break;
            case " building_num":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, building_num: ' building_num is required ' });

                    } else {
                        setFormErrors({ ...formErrors, building_num: null });
                    }
                }
                break;
            case " street":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, street: ' street is required ' });

                    } else {
                        setFormErrors({ ...formErrors, street: null });
                    }
                }
                break;
            case " gender":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, gender: ' gender is required ' });

                    } else {
                        setFormErrors({ ...formErrors, gender: null });
                    }
                }
                break;


        }
    }


    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || '/auth/login';


    const onSubmitForm = e => {
        e.preventDefault();

        if(form.email.length > 1 && form.user_name.length > 1 
            && form.password.length > 1 && form.confirmPassword.length > 1 
            && form.age > 0 && form.address.city.length > 1
            && form.address.street.length > 1 && form.address.building_num > 0
            && form.gender.length > 1 && form.phone.length > 1
        )
        {
            
        }
        else{
            Swal.fire('Please Fill Your All data Correctly');
            return;
        }

        form.address.building_num = +form.address.building_num;
        

        if(Object.values(formErrors).some((error) => error !== null))
        {
            Swal.fire("Can't Register With this in-valid data");

            return;
        }






        // console.log(Object.keys(formErrors).length);
        // if (Object.keys(formErrors).some((error) => error !== null)) {
        //     //setIsSubmit(true);
        //     console.log('ahmedadsasdasddas')
        // } else {
        //     alert("please fill the form corectly");
        //     return;
        // }

        axios.post('https://handy-market-api.onrender.com/api/v1/auth/singUp', form).then((res) => {

            Swal.fire(
                'You Register Successfully',
                'Please Check Your Email to Active You Account',
                'success'
            )
            setTimeout(()=>{
                navigate(redirectPath, { replace: true });
            }, 2000)
            

        }).catch((err) => {

            seterrMssg(err.response?.data.message);

            // if (err.response?.data.message === "Email Exist") {
            //     const myError = err.response.data.message;
            //     seterrMssg(myError);
            // }
            // console.log(err.response.data.message)

        });
    };





    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="w-100 h-100">
                        <img src="images/Creativity-cuate.png" className="img-fluid h-100 w-100" alt="user img" />
                    </div>
                </div>
                <div className=' shadow-lg p-4 my-5  bg-body-tertiary rounded col-md-7 pe-lg-5'>
                    <div className='mt-2'>
                        <form onSubmit={onSubmitForm} className='sign-in-form pb-5 ' >

                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="form-group">

                                        <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
                                        <input type="email" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />
                                        
                                        <div className=" text-danger">
                                            {formErrors.email}
                                        </div>

                                        <small id="emailHelp" className="form-text text-muted">{t("We'll never share your email with anyone else.")}</small>


                                        <div className=" text-danger">
                                            {errMssg && <p>{errMssg}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group col mb-2">

                                        <label htmlFor="examplephone" className='my-2'>{t("phone")}</label>
                                        <input type="text" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="examplephone" name="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} onBlur={onHandleBlur} />

                                        <div className=" text-danger">
                                            {formErrors.phone}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group ">

                                        <label htmlFor="exampleInputusername" className='my-2'>{t("User Name")}</label>
                                        <input type="text" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="exampleInputusername" placeholder="user name" onBlur={onHandleBlur} name="user_name" value={form.user_name} onChange={onUpdateField} noValidate />

                                        <div className=" text-danger">
                                            {formErrors.user_name}
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <label htmlFor="exampleInputusername" className='my-2'>{t("Age")} </label>
                                        <input type="number" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="exampleInputAge" aria-describedby="age" placeholder="age" name="age" value={form.age} onBlur={onHandleBlur} onChange={onUpdateField} />

                                        <div className=" text-danger">
                                            {formErrors.age}
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <label htmlFor="password" className='my-2'>{t("Password")}</label>
                                        <input type="password" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="password" name="password" placeholder="Password" value={form.password} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />

                                        <div className=" text-danger">
                                            {formErrors.password}
                                        </div>

                                        <small id="emailHelp" className="form-text text-muted">{t("Enter at least one Capital Letter and One(@_#_%_&_*)")}</small>

                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <label htmlFor="confirmPassword" className='my-2'>{t("confirm Password")}</label>
                                        <input type="password" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="confirmPassword" name="confirmPassword" placeholder="confirmPassword" value={form.confirmPassword} onChange={onUpdateField} onBlur={onHandleBlur} />

                                        <div className=" text-danger">
                                            {formErrors.confirmPassword}
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="form-group col-md-6">

                                    <label htmlFor="exampleInputaddress" className='my-2'>{t("city")}</label>
                                    <input type="text" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="city" name="city" placeholder="city" value={form.address.city} onChange={UpdateAddress} onBlur={onHandleBlur} />

                                    <div className=" text-danger">
                                        {formErrors.city}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">

                                    <label htmlFor="exampleInputaddress" className='my-2'>{t("street")}</label>
                                    <input type="text" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="street" name="street" placeholder="street" value={form.address.street} onChange={UpdateAddress} onBlur={onHandleBlur} />

                                    <div className=" text-danger">
                                        {formErrors.street}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">

                                    <label htmlFor="exampleInputaddress" className='my-2'>{t("building number")}</label>
                                    <input type="text" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="building_num" name="building_num" placeholder="building_num" value={form.address.building_num} onChange={UpdateAddress} onBlur={onHandleBlur} />

                                    <div className=" text-danger">
                                        {formErrors.building_num}
                                    </div>
                                </div>
                            </div>

                            <div className="form-check form-check-inline mt-2">
                                <input type="radio" className="form-check-input" id="female" name="gender" value="Female" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="female">{t("Female")}</label>
                            </div>
                            <div className="form-check form-check-inline mt-2">
                                <input type="radio" className="form-check-input" id="male" name="gender" value="Male" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="male">{t("Male")}</label>
                            </div>
                            <div className="text-danger">
                                {formErrors.gender}
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className={` ${styles.mybtn}`}>{t("Submit")}</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Register;