import { useState } from "react";
import axios from "axios";
import { FaWpbeginner } from 'react-icons/fa';
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../guard/Auth";
import styles from './Login.module.css';

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [formErrors, setFormErrors] = useState({});
    const [errMssg, seterrMssg] = useState();
    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();
    const redirectPath = location.state?.path || '/';

    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };
    const validate = (val) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const pass = /^[A-Z][1-9]{2,5}$/;
        if (!val.email) {
            errors.email = "email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "this email not vaild! "
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
        return errors;
    }
    const onSubmitForm = e => {
        e.preventDefault();
        setFormErrors(validate(form));
        axios.post('http://localhost:3000/api/v1/auth/login', form).then((res) => {
            console.log('sucess', res);
            const data = res.data
            const token = data.token;
            const id = data.userId;
            const role = data.role;
            localStorage.clear();
            localStorage.setItem('user-token', token);
            localStorage.setItem('user-id', id);
            localStorage.setItem('role', role);
            auth.login(token, role)
            if (res.data.message === 'Login Success') {
                navigate(redirectPath, { replace: true });
            }
        }).catch((err) => {
            if (err.response?.data.message === "Email and Password misMatch") {
                const myError = err.response.data.message;
                seterrMssg(myError)
            }
            if (err.response?.data.message === "You are Already Login.") {
                const myError = err.response.data.message;
                seterrMssg(myError)
            }
        });
    };
    return (
        <div className={styles.mycontainer}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <form onSubmit={onSubmitForm} className={styles.myform}>
                        <h2 className="title">Log in</h2>
                        <div className={styles.input_field}>
                            <i><AiOutlineUser /></i>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.email}
                        </div>
                        <div className=" text-danger">
                            {errMssg && <p>{errMssg}</p>}
                        </div>
                        <div className={styles.input_field}>
                            <i><FaWpbeginner /></i>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                                placeholder="Password" value={form.password} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.password}
                        </div>
                        <div className="form-check">
                        <label className={styles.checkbox}><span>Remember Me</span>
                                    <input type="checkbox" id="rememberMe" name="rememberMe" value="true" onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.value }))}  />
                                    <span className={styles.checkmark}></span>
                                </label>
                        </div>
                        <Link to="/forgetPassword">forget password</Link>
                        <input type="submit" value="Login" className={`solid ${styles.mybtn}`} />
                    </form>
                </div>
            </div>
            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h3 className={styles.panel_h3}>New here ?</h3>
                        <p className={styles.panel_para}>
                            Be one of our family. 
                            Join us now.
                            sign up from here
                        </p>
                        <Link to="/role">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                    <img src="/images/16.png" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login;