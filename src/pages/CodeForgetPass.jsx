import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CodeForgetPass = () => {
    const [form, setForm] = useState({
        code: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [errMssg, seterrMssg] = useState();
    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };
    const validate = (val) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!val.email) {
            errors.email = "email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "this email not vaild! "
        }
        if (!val.code) {
            errors.email = "code is required"
        }
        return errors;
    }
    const navigate = useNavigate();
    const onSubmitForm = e => {
        e.preventDefault();
        setFormErrors(validate(form));
        axios.post('http://localhost:3000/api/v1/auth/checkCode', form).then((res) => {
            console.log('sucess', res);
            if (res.data.message === "Done Right code  to Your Email") {
                navigate('/changePassword');
            }
        }).catch((err) => {
            const myError = err.response.data.message;
            seterrMssg(myError)
        });
    };
    return (
        <div className="mycontainer">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={onSubmitForm} className="sign-in-form myform">
                        <h2 className="title">check your email</h2>
                        <p></p>
                        <div className="input-field">
                            <i > <AiOutlineUser /></i>
                            <input type="email" classNameName="form-control" id="exampleInputEmail1"
                                placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} />
                        </div>
                        <div className='err'>
                            {formErrors.email}
                        </div>
                        <div className=" text-danger">
                            {errMssg && <p>{errMssg}</p>}
                        </div>

                        <div className="input-field">
                            <i > <AiOutlineUser /></i>
                            <input type="text" classNameName="form-control" id="code"
                                placeholder="Enter your code" name="code" value={form.code} onChange={onUpdateField} />
                        </div>
                        <div className='err'>
                            {formErrors.code}
                        </div>
                        <input type="submit" value="next" className="mybtn solid" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <Link to="/role">
                            <button className="mybtn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                    <img src="/images/undraw.svg" className="myimage" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CodeForgetPass;