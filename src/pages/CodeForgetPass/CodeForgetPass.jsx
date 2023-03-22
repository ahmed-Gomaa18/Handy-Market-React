import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './CodeForgetPass.module.css';

import { useTranslation } from 'react-i18next';

const CodeForgetPass = () => {


    const { t } = useTranslation();

    const [form, setForm] = useState({
        code: "",
    });
    const location = useLocation();
    const [formErrors, setFormErrors] = useState({});
    const [errMssg, seterrMssg] = useState();

    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
    };
    const validate = (val) => {
        const errors = {};
        if (!val.code) {
            errors.code = "code is required"
        }
        return errors;
    }
    const navigate = useNavigate();
    const onSubmitForm = e => {
        e.preventDefault();
        setFormErrors(validate(form));

        axios.post('https://handy-market-api.onrender.com/api/v1/auth/checkCode', form).then((res) => {

            if (res.data.message === "Done Right code  to Your Email") {
                navigate('/changePassword', { state: location.state });
                
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

                        <h2 className="title"> {t("check your email for code")} </h2>



                        <div className={styles.input_field}>
                            <i > <AiOutlineUser /></i>
                            <input type="text"
                                className="form-control"
                                id="code"
                                placeholder="Enter your code"
                                name="code"
                                maxLength="5"
                                value={form.code}
                                onChange={onUpdateField} />
                        </div>

                        <div className={styles.err}>
                            {formErrors.code}
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
                            {t("Be one of our family. Join us now.sign up from here")}
                        </p>
                        <Link to="/role">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                {t("Sign up")}
                            </button>
                        </Link>
                    </div>
                    <img src="/images/forgett.png" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default CodeForgetPass;