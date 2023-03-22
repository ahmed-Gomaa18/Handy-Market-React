import { useState } from "react";
import axios from "axios";
import { FaWpbeginner } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './ChangePassword.module.css';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        newPassword: "", email: ""
    });
    const location = useLocation();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMssg, seterrMssg] = useState();

    const onUpdateField = e => {
        const { name, value } = e.target;
        const nextFormState = { ...form, [name]: value };
        setForm(nextFormState);
        // setFormErrors(validate(form));
        validate(name, value)
    };
    const validate = (name, value) => {
        if (!value) {
            setFormErrors({ ...formErrors, [name]: "Please, Enter required data" })
            return
        };
        switch (name) {
            case "newPassword":
                {
                    if (value.length < 6) {
                        setFormErrors({ ...formErrors, newPassword: 'Your newPassword should be more than 6 digits' });
                    } else if (value.length > 16) {
                        setFormErrors({ ...formErrors, newPassword: 'Your newPassword shouldnt exceed 16 digits' });
                    } else if (!new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(value)) {
                        setFormErrors({ ...formErrors, newPassword: 'Your newPassword should contain at least one number and one special character' });
                    } else {
                        setFormErrors({ ...formErrors, newPassword: null });
                    }
                }
                break;
        }
    }
    const navigate = useNavigate();
    const onSubmitForm = (e) => {
        e.preventDefault();

        const myEmail = form;
        myEmail.email = location.state;
        setForm(myEmail);
        const { name, value } = e.target;
        validate(name, value)
        // setFormErrors(validate(myEmail));
        if (Object.keys(formErrors).some((error) => error !== null)) {
            setIsSubmit(true);
        } else {
            alert("please fill the form corectly");
            return;
        }
      
        axios.post('https://handy-market-api.onrender.com/api/v1/auth/forgetPassword', form).then((res) => {

            if (res.data.message === 'Done update Your Password , Login now') {
                setIsSubmit(true);
                navigate('/auth/login');
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
                        <h2 className="title">{t("Change Password")}</h2>
                        <div className={styles.input_field}>
                            <i > <FaWpbeginner /> </i>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="newPassword"
                                placeholder="enter at least one capital and 1 (@_#_%_&_*) " value={form.newPassword} onChange={onUpdateField} />
                        </div>
                        <div className={styles.err}>
                            {formErrors.newPassword}
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
                    <img src="/images/f3.png" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;