import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from './CodeForgetPass.module.css';

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
        <div className={styles.mycontainer}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <form onSubmit={onSubmitForm} className={styles.myform}>
                        <h2 className="title">check your email</h2>
                        <p></p>
                        <div className={styles.input_field}>
                            <i > <AiOutlineUser /></i>
                            <input type="email" classNameName="form-control" id="exampleInputEmail1"
                                placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.email}
                        </div>
                        <div className=" text-danger">
                            {errMssg && <p>{errMssg}</p>}
                        </div>

                        <div className={styles.input_field}>
                            <i > <AiOutlineUser /></i>
                            <input type="text" classNameName="form-control" id="code"
                                placeholder="Enter your code" name="code" value={form.code} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.code}
                        </div>
                        <input type="submit" value="next" className={`solid ${styles.mybtn}`} />
                    </form>
                </div>
            </div>

            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h3 className={styles.panel_h3}>New here ?</h3>
                        <p className={styles.panel_para}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <Link to="/role">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                    <img src="/images/undraw.svg" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default CodeForgetPass;