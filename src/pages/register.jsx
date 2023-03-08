import { useState } from "react";
import axios from "axios"
const Register = () => {
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

    //====>address obj
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
    // =====update field + validations
    const onUpdateField = e => {
        form.age = +form.age;
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };

    //validation function
    const validate = (val) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phonenum = /^\d{11}$/;
        const pass = /^[A-Z][1-9]{2,5}$/;
        //name vaildations
        if (!val.user_name) {
            errors.user_name = "username is required"
        } else if (val.user_name.length < 3) {
            errors.user_name = "username is must be more than three digits"
        } else if (val.user_name.length > 20) {
            errors.user_name = "username is must be less than 20 digits"
        }
        //email validations
        if (!val.email) {
            errors.email = "email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "this email not vaild! "
        }
        // age validation
        if (!val.age) {
            errors.age = "age is required"
        } else if (val.age <= 15) {
            errors.age = "un vaild! "
        }
        // gender 
        if (!val.gender) {
            errors.gender = "gender is required"
        }
        //password 
        if (!val.password) {
            errors.password = "password is required"
        } else if (val.password < 2) {
            errors.password = "Password length must be atleast 2 characters"
        } else if (val.password > 5) {
            errors.password = "Password length must not exceed 5 characters"
        } else if (!pass.test(form.password)) {
            errors.password = "Password length must not exceed 5 characters"
        }
        //confirm pass
        if (!val.confirmPassword) {
            errors.confirmPassword = "confirmPassword is required"
        } else if (val.password === val.confirmPassword) {
            errors.confirmPassword = "passwords did not match"
        }
        // address validations
        if (!val.address) {
            errors.address = " address is required"
        }
        //phone
        if (!val.phone) {
            errors.phone = "phone is required"
        } else if (!phonenum.test(form.phone)) {
            errors.phone = "phone is not vaild"
        }
        return errors;
    }

    //onsubimt form + validations
    const onSubmitForm = e => {
        form.address.building_num = +form.address.building_num;
        e.preventDefault();
        setFormErrors(validate(form))
        setIsSubmit(true);
        axios.post('http://localhost:3000/api/v1/auth/singUp', form).then((res) => {
        }).catch((err) => {
            if (err.response?.data.message === "Email Exist") {
                const myError = err.response.data.message;
                seterrMssg(myError)
            }
            console.log(err.response.data.message)
        });
    };

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className='offset-lg-1 col-md-6 pe-lg-5 order-s-frist'>
                    <div className='mt-2'>
                        <form onSubmit={onSubmitForm} className='sign-in-form pb-5 ' >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} noValidate />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <div className=" text-danger">
                                    {formErrors.email }
                                </div>
                                <div className=" text-danger">
                                    {errMssg && <p>{errMssg}</p>}
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="exampleInputusername" className='my-2'>User Name</label>
                                <input type="text" className="form-control" id="exampleInputusername" placeholder="user name" name="user_name" value={form.user_name} onChange={onUpdateField} noValidate />
                                <div className=" text-danger">
                                    {formErrors.user_name}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputusername" className='my-2'>Age </label>
                                <input type="number" className="form-control" id="exampleInputAge" aria-describedby="age" placeholder="age" name="age" value={form.age} onChange={onUpdateField} />
                                <div className=" text-danger">
                                    {formErrors.age}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={form.password} onChange={onUpdateField} noValidate />
                                <div className=" text-danger">
                                    {formErrors.password}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputconfirmPassword1" className='my-2'>confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputconfirmPassword1" name="confirmPassword" placeholder="confirmPassword" value={form.confirmPassword} onChange={onUpdateField} />
                                <div className=" text-danger">
                                    {formErrors.confirmPassword}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="exampleInputaddress" className='my-2'>city</label>
                                    <input type="text" className="form-control" id="city" name="city" placeholder="city" value={form.address.city} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="exampleInputaddress" className='my-2'>street</label>
                                    <input type="text" className="form-control" id="street" name="street" placeholder="street" value={form.address.street} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="exampleInputaddress" className='my-2'>building number</label>
                                    <input type="text" className="form-control" id="building_num" name="building_num" placeholder="building_num" value={form.address.building_num} onChange={UpdateAddress} />
                                    <div className=" text-danger">
                                        {formErrors.address}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col mb-2">
                                <label htmlFor="examplephone " className='my-2'>phone</label>
                                <input type="text" className="form-control" id="examplephone" name="phone" placeholder="phone" value={form.phone} onChange={onUpdateField} />
                                <div className=" text-danger">
                                    {formErrors.phone}
                                </div>
                            </div>
                            <div className="form-check form-check-inline " >
                                <input type="radio" className="form-check-input" id="female" name="female" value="Female" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="exampleCheck">Female</label>
                            </div>
                            <div className="form-check form-check-inline " >
                                <input type="radio" className="form-check-input" id="Male" name="Male" value="Male" onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
                                <label className="form-check-label" htmlFor="exampleCheck1">Male</label>
                            </div>
                            <div class=" text-danger  ">
                                {formErrors.gender}
                            </div>
                            <button type="submit" className="btn btn-primary   position-absolute end-50 mb-3">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-5 ps-lg-5 order-s-last">
                    <div className="h-100 layer">
                        <img src="/images/1.jpg" className="img-fluid h-100 " alt=" user img" />
                        <div className='overlay'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;