import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from './ForgetPassword.module.css';

import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {

    const { t } = useTranslation();

    const [form, setForm] = useState({ email: "" });
    const [formErrors, setFormErrors] = useState({});
    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };
    const navigate = useNavigate();
    const validate = (val) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!val.email) {
            errors.email = "email is required"
        } else if (!regex.test(form.email)) {
            errors.email = "this email not vaild! "
        }
        return errors;
    }
    const onSubmitForm = e => {
        e.preventDefault();
        setFormErrors(validate(form));

        axios.post('https://handy-market-api.onrender.com/api/v1/auth/sendCode', form).then((res) => {

            if (res.data.message === "Done , Please cheack Your Email") {
                navigate('/CodeForgetPass', { state: form.email });
            }
        }).catch((err) => console.log(err));
    };

    return (
        <div className={styles.mycontainer}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <form onSubmit={onSubmitForm} className={styles.myform}>
                        <h2 className="title">{t("Forget password")}</h2>
                        <div className={styles.input_field}>
                            <i > <AiOutlineUser /></i>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                placeholder="Enter email" name="email" value={form.email} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.email}
                        </div>
                        <input type="submit" value={t("next")} className={`solid ${styles.mybtn}`} />
                    </form>
                </div>
            </div>

            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h3 className={styles.panel_h3}>{t("New here ?")}</h3>
                        <p className={styles.panel_para}>
                        {t("login from here  amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!")}
                        </p>
                        <Link to="/role">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                {t("Sign up")}
                            </button>
                        </Link>
                    </div>
                    <img src="/images/forget.png" className={styles.myimage}  alt="" />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;