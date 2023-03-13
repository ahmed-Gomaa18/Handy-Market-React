import { useState } from "react";
import axios from "axios";
import styles from './SellerReg.module.css';

const SellerSignUp = () => {
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
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };

    const validate = (val) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phonenum = /^\d{11}$/;
        const pass = /^[A-Z][1-9]{2,5}$/;
        if (!val.user_name) {
            errors.user_name = "username is required"
        } else if (val.user_name.length < 3) {
            errors.user_name = "username is must be more than three digits"
        } else if (val.user_name.length > 20) {
            errors.user_name = "username is must be less than 20 digits"
        }
        if (!val.full_name) {
            errors.full_name = "full name is required"
        } else if (val.full_name.length < 3) {
            errors.full_name = "full name is must be more than three digits"
        } else if (val.full_name.length > 20) {
            errors.full_name = "full name is must be less than 20 digits"
        }
        if (!val.shop_name) {
            errors.shop_name = "shop_name is required"
        } else if (val.shop_name.length < 3) {
            errors.shop_name = "shop_name is must be more than three digits"
        } else if (val.shop_name.length > 20) {
            errors.shop_name = "shop_name is must be less than 20 digits"
        }
        if (!val.description) {
            errors.description = "description is required"
        } else if (val.description.length < 3) {
            errors.description = "description is must be more than three digits"
        } else if (val.description.length > 20) {
            errors.description = "description is must be less than 20 digits"
        }
        if (!val.email) {
            errors.email = "email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "this email not vaild! "
        }
        if (!val.age) {
            errors.age = "age is required"
        } else if (val.age <= 15) {
            errors.age = "un vaild! "
        }
        if (!val.gender) {
            errors.gender = "gender is required"
        }
        if (!val.password) {
            errors.password = "password is required"
        } else if (val.password < 2) {
            errors.password = "Password length must be atleast 2 characters"
        } else if (val.password > 5) {
            errors.password = "Password length must not exceed 5 characters"
        } else if (!pass.test(form.password)) {
            errors.password = "Password length must not exceed 5 characters"
        }
        if (!val.confirmPassword) {
            errors.confirmPassword = "confirmPassword is required"
        } else if (val.password !== val.confirmPassword) {
            errors.confirmPassword = "passwords did not match"
        }
        if (!val.address) {
            errors.address = "address is required"
        }
        if (!val.phone) {
            errors.phone = "phone is required"
        } else if (!phonenum.test(form.phone)) {
            errors.phone = "phone is not vaild"
        }
        return errors;
    }

    const onSubmitForm = e => {
        form.address.building_num = +form.address.building_num;
        form.age = +form.age;
        e.preventDefault();
        setFormErrors(validate(form));
        axios.post('http://localhost:3000/api/v1/auth/seller/singUp', form).then((res) => {
            console.log('sucess', res);
        }).catch((err) => {
            console.log(err.message)
            seterrMssg(err)
        });
    };
    return (
        <div className="container ">
            <div className="row">
            <div className=" col-md-4 mt-5 ">
                    <div className="h-75 mt-5">
                        <img src="images/a1.jpg" className="img-fluid h-100 imgg" alt="" />
                        <div className={styles.overlay}>
                        </div>
                    </div>
               
                </div>
                <div className='px-3 shadow-lg my-5 bg-body-tertiary rounded pb-5 col-md-8 pe-lg-5'>
                    <div className=' mt-5'>
                        <form onSubmit={onSubmitForm} className='sign-in-form ' >
                            <div className="form-group ">
                                <label htmlFor="InputEmail1" className='my-2'>Email address</label>
                                <input type="email" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} noValidate />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <div className=" text-danger">
                                    {formErrors.email}
                                </div>
                                <div className=" text-danger">
                                    {errMssg && <p>{errMssg}</p>}
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="InputPassword1" className='my-2'>Password</label>
                                    <input type="password" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputPassword1" name="password" placeholder="Password" value={form.password} onChange={onUpdateField} noValidate />
                                    <div className=" text-danger">
                                        {formErrors.password}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="confirmPassword1" className='my-2'>confirm Password</label>
                                    <input type="password" className="form-control  mb-1 shadow bg-body-tertiary rounded" id="confirmPassword1" name="confirmPassword" placeholder="confirmPassword" value={form.confirmPassword} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.confirmPassword}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputusername" className='my-2'>User Name</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputusername" placeholder="user name" name="user_name" value={form.user_name} onChange={onUpdateField} noValidate />
                                    <div className=" text-danger">
                                        {formErrors.user_name}
                                    </div>
                                </div>
                                <div className="form-group  col-md-6">
                                    <label htmlFor="Inputuserfullname" className='my-2'>full Name</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputuserfullname" placeholder="full name" name="full_name" value={form.full_name} onChange={onUpdateField} noValidate />

                                    <div className=" text-danger">
                                        {formErrors.full_name}
                                    </div>
                                </div>

                                <div className="form-group  col-md-6">
                                    <label htmlFor="Inputusershop_name" className='my-2'>shop Name</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="Inputusershop_name" placeholder="shop name" name="shop_name" value={form.shop_name} onChange={onUpdateField} noValidate />

                                    <div className=" text-danger">
                                        {formErrors.shop_name}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="description" className='my-2'>description </label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="description" aria-describedby="description" placeholder="description" name="description" value={form.description} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.description}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col col-md-6">
                                    <label htmlFor="phone " className='my-2'>phone</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="phone" name="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.phone}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputusername" className='my-2'>Age </label>
                                    <input type="number" className="form-control mb-1 shadow bg-body-tertiary rounded" id="InputAge" aria-describedby="age" placeholder="age" name="age" value={form.age} onChange={onUpdateField} />
                                    <div className=" text-danger">
                                        {formErrors.age}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputaddress" className='my-2'>city</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="city" name="city" placeholder="city" value={form.address.city} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="Inputaddress" className='my-2'>street</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="street" name="street" placeholder="street" value={form.address.street} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="Inputaddress" className='my-2'>building number</label>
                                    <input type="text" className="form-control mb-1 shadow bg-body-tertiary rounded" id="building_num" name="building_num" placeholder="building_num" value={form.address.building_num} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="female" name="gender" value="Female" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="male" name="gender" value="Male" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            
                            <div className=" text-danger">
                                {formErrors.gender}
                            </div>
                            <button type="submit" className={`btn ${styles.mybtn}`}>Submit</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>


    )
}

export default SellerSignUp;