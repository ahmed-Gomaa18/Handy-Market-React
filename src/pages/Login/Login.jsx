import { useState } from "react";
import axios from "axios";
import { FaWpbeginner } from 'react-icons/fa';
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../guard/Auth";
import styles from './Login.module.css';

import { ProgressBar } from 'react-loader-spinner'

import { useTranslation } from 'react-i18next';

const Login = () => {
    
    const [avalForm, setAvalForm] = useState('block')
    const [avalLoading, setavalLoading] = useState(false)

    const { t } = useTranslation();

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
        //const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!val.email) {
            errors.email = "Email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "This email not vaild! "
        }
        if (!val.password) {
            errors.password = "Password is required"
        }

        //  else if (val.password.length < 6) {
        //     errors.password = "Password length must be atleast 6 characters"
        // } 
        // else if (val.password.length > 16) {
        //     errors.password = "Password length must not exceed 16 characters"
        // } 
        // else if (!pass.test(form.password)) {
        //     errors.password = "please recheck your password"
        // }

        return errors;
    }
    const onSubmitForm = e => {
        e.preventDefault();

        // Check Error
        const errors = validate(form);
        if(Object.keys(errors).length>0){
            
            // Rest Password Filed
            setForm({
                email: form.email,
                password: '',
                rememberMe: false
            })
            setFormErrors(errors);


            return;
        };       
        axios.post('https://handy-market-api.onrender.com/api/v1/auth/login', form).then((res) => {

            //localStorage.clear();
            localStorage.removeItem('user-token');
            localStorage.removeItem('user-id');
            localStorage.removeItem('role');
            localStorage.setItem('user-token', res.data.token);
            localStorage.setItem('user-id', res.data.userId);
            localStorage.setItem('role', res.data.role);
            auth.login(res.data.token,  res.data.role);
            
            //-----------------
            setAvalForm("none");
            setavalLoading(true);
            //------------------
            setTimeout(()=>{
                navigate(redirectPath);
            }, 1000)
            

            // const data = res.data
            // const token = data.token;
            // const id = data.userId;
            // const role = data.role;
            // localStorage.clear();
            // localStorage.setItem('user-token', token);
            // localStorage.setItem('user-id', id);
            // localStorage.setItem('role', role);
            // auth.login(token, role);
            
            // if (res.data.message === 'Login Success') {
            //     navigate(redirectPath, { replace: true });
            // }
        }).catch((err) => {
            
            console.log(err);
            console.log(err.response?.data.message)

            // Rest Password Filed
            setForm({
                email: form.email,
                password: '',
                rememberMe: false
            })

            seterrMssg(err.response?.data.message);
            
            // if (err.response?.data.message === "Email and Password misMatch") {
            //     const myError = err.response.data.message;
            //     seterrMssg(myError)
            // }
            // if (err.response?.data.message === "You are Already Login.") {
            //     const myError = err.response.data.message;
            //     seterrMssg(myError)
            // }
        });
    };
    return (

        <>

        <ProgressBar
        visible={avalLoading}
        height="250"
        width="250"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{width: "100%", marginTop: '10%', marginBottom: '10%'}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#72a499d1'
        barColor = '#ff6c02'
        
        />


        <div className={styles.mycontainer} style={{display: avalForm}}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <form onSubmit={onSubmitForm} className={styles.myform}>
                        <h2 className="title">{t("Log in")}</h2>
                        <div className={styles.input_field}>
                            <i><AiOutlineUser /></i>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.email}
                        </div>

                        <div className={styles.input_field}>
                            <i><FaWpbeginner /></i>
                            <input type="password"  className="form-control" id="exampleInputPassword1" name="password"
                                placeholder="Password" value={form.password} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.password}
                        </div>
                        <div className="text-danger">
                            {errMssg && <p>{errMssg}</p>}
                        </div>
                        <div className="form-check">
                        <label className={styles.checkbox}><span>{t("Remember Me")}</span>
                                    <input type="checkbox" id="rememberMe" name="rememberMe" value="true" onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.value }))}  />
                                    <span className={styles.checkmark}></span>
                                </label>
                        </div>
                        <Link to="/forgetPassword">{t("Forget password")}</Link>
                        <input type="submit" value={t("Login")} className={`solid ${styles.mybtn}`} />
                    </form>
                </div>
            </div>
            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h3 className={styles.panel_h3}>{t("New here ?")}</h3>
                        <p className={styles.panel_para}>
                            {t("Be one of our family. Join us now.sign up from here")}
                        </p>
                        <Link to="/role">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                {t("Sign up")}
                            </button>
                        </Link>
                    </div>
                    <img src="/images/16.png" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;