import { useState } from "react";
import axios from "axios";
import styles from './SellerReg.module.css';
import { useNavigate, useLocation } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const SellerSignUp = () => {


    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || '/auth/login';


    const [form, setForm] = useState({
        user_name: "",
        full_name: "",
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
        role: "Seller",
        phone: "",
        shop_name: "",
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMssg, seterrMssg] = useState();

    //====>address obj
    // const UpdateAddress = e => {
    //     form.address.building_num = +form.address.building_num;
    //     setForm((prev) => {
    //         return {
    //             ...prev, address: {
    //                 ...prev.address,
    //                 [e.target.name]: e.target.value
    //             }
    //         }
    //     })
    // }
    // =====update field + validations
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
            setFormErrors({ ...formErrors, [name]: "Please, Enter required data" })
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
            case "full_name":
                {
                    if (value.length <= 3) {
                        setFormErrors({ ...formErrors, full_name: 'full_name should be more than three digits' });
                    } else if (value.length >= 20) {
                        setFormErrors({ ...formErrors, full_name: 'full_name maximum 20 digits' });
                    } else {
                        setFormErrors({ ...formErrors, full_name: null });
                    }
                }
                break;
            case "shop_name":
                {
                    if (value.length <= 3) {
                        setFormErrors({ ...formErrors, shop_name: 'shop_name should be more than three digits' });
                    } else if (value.length >= 20) {
                        setFormErrors({ ...formErrors, shop_name: 'shop_name maximum 20 digits' });
                    } else {
                        setFormErrors({ ...formErrors, shop_name: null });
                    }
                }
                break;
            case "description":
                {
                    if (value.length <= 15) {
                        setFormErrors({ ...formErrors, description: 'description minmum 15 digits' });
                    } else if (value.length >= 20) {
                        setFormErrors({ ...formErrors, description: 'description maximum 20 digits' });
                    } else {
                        setFormErrors({ ...formErrors, description: null });
                    }
                }
                break;
            case "email":
                {
                    if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i).test(value)) {
                        setFormErrors({ ...formErrors, email: 'please check your email' });
                        return
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
                    console.log("hii");

                    if (form.password !== value) {
                        console.log(false);
                        setFormErrors({ ...formErrors, confirmPassword: 'Your password is miss match ' });
                    } else {
                        console.log(true);
                        setFormErrors({ ...formErrors, confirmPassword: null });
                    }

                }
                break;


            case "phone":
                {
                    if (!new RegExp(/^\d{11}$/).test(value)) {
                        setFormErrors({ ...formErrors, phone: 'phone must be number of eleven digits' });
                    } else if (value.length != 11) {
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
            case "building_num":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, building_num: ' building_num is required ' });

                    } else {
                        setFormErrors({ ...formErrors, building_num: null });
                    }
                }
                break;
            case "street":
                {
                    if (!value) {
                        setFormErrors({ ...formErrors, street: ' street is required ' });

                    } else {
                        setFormErrors({ ...formErrors, street: null });
                    }
                }
                break;
            case "gender":
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

    //onsubimt form + validations
    const onSubmitForm = e => {
        form.address.building_num = +form.address.building_num;
        form.age = +form.age;
        e.preventDefault();

        if (Object.keys(formErrors).some((error) => error !== null)) {
            setIsSubmit(true);
            
        } else {
            alert("please fill the form corectly");
            return;
        }
        axios.post('https://handy-market-api.onrender.com/api/v1/auth/seller/singUp', form).then((res) => {

            navigate(redirectPath, { replace: true });
        }).catch((err) => {
            if (err.response?.data.message === "Email Exist") {
                const myError = err.response.data.message;
                seterrMssg(myError);
            }
            console.log(err.response.data.message)
            console.log(err);

        });

    };
    return (
        <div className="container ">
            <div className="row">

                <div className='px-3 shadow-lg my-5 bg-body-tertiary rounded pb-5 col-md-7 pe-lg-5'>
                    <div className=' mt-5'>
                        <form onSubmit={onSubmitForm} className='sign-in-form ' >
                            <div className="form-group ">
                                <label htmlFor="InputEmail1" className='my-2'>{t("Email address")}</label>
                                <input type="email" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />
                                <small id="emailHelp" className="form-text text-muted">{t("We'll never share your email with anyone else.")}</small>
                                <div className=" text-danger">
                                    {formErrors.email}
                                </div>
                                <div className=" text-danger">
                                    {errMssg && <p>{errMssg}</p>}
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="InputPassword1" className='my-2'>{t("Password")}</label>
                                    <input type="password" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputPassword1" name="password" placeholder="enter at least one capital and 1 (@_#_%_&_*)" value={form.password} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />
                                    <div className=" text-danger">
                                        {formErrors.password}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="confirmPassword1" className='my-2'>{t("confirm Password")}</label>
                                    <input type="password" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="confirmPassword1" name="confirmPassword" placeholder="confirmPassword" value={form.confirmPassword} onChange={onUpdateField} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.confirmPassword}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputusername" className='my-2'>{t("User Name")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputusername" placeholder="user name" name="user_name" value={form.user_name} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />
                                    <div className=" text-danger">
                                        {formErrors.user_name}
                                    </div>
                                </div>
                                <div className="form-group  col-md-6">
                                    <label htmlFor="Inputuserfullname" className='my-2'>{t("full Name")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputuserfullname" placeholder="full name" name="full_name" value={form.full_name} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />

                                    <div className=" text-danger">
                                        {formErrors?.full_name}
                                    </div>
                                </div>

                                <div className="form-group  col-md-6">
                                    <label htmlFor="Inputusershop_name" className='my-2'>{t("shop Name")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputusershop_name" placeholder="shop name" name="shop_name" value={form.shop_name} onChange={onUpdateField} onBlur={onHandleBlur} noValidate />

                                    <div className=" text-danger">
                                        {formErrors.shop_name}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="description" className='my-2'>{t("Description")} </label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="description" aria-describedby="description" placeholder="description" name="description" value={form.description} onBlur={onHandleBlur} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.description}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col col-md-6">
                                    <label htmlFor="phone " className='my-2'>{t("phone")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="phone" name="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.phone}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputusername" className='my-2'>{t("Age")} </label>
                                    <input type="number" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputAge" aria-describedby="age" placeholder="age" name="age" value={form.age} onChange={onUpdateField} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.age}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputaddress" className='my-2'>{t("city")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="city" name="city" placeholder="city" value={form.address.city} onChange={UpdateAddress} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.city}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputaddress" className='my-2'>{t("street")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="street" name="street" placeholder="street" value={form.address.street} onChange={UpdateAddress} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.street}
                                    </div>
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="Inputaddress" className='my-2'>{t("building number")}</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="building_num" name="building_num" placeholder="building_num" value={form.address.building_num} onChange={UpdateAddress} onBlur={onHandleBlur} />
                                    <div className=" text-danger">
                                        {formErrors.building_num}
                                    </div>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="female" name="gender" value="Female" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="female">{t("Female")}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="male" name="gender" value="Male" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="male">{t("Male")}</label>
                            </div>
                            <div className=" text-danger">
                                {formErrors.gender}
                            </div>
                            
                            <button type="submit" className={` ${styles.mybtn}`}>{t("Submit")}</button>
                        

                        </form>
                    </div>
                </div>

                <div className=" col-md-5 ">
                    <div className="w-100 h-100">
                        <img src="images/Sculpting-cuate.png" className="img-fluid h-100 imgg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerSignUp;