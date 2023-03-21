import { Link } from "react-router-dom";
import styles from './Role.module.css'


import { useTranslation } from 'react-i18next';

const Role = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.mycontainer}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <div className={styles.myform}>
                        <h2 className="title">{t("Roles")}</h2>
                        <Link to="/register" > <button className={styles.mybtn}>{t("Customer")}</button></Link>
                        <Link to="/sellerSignUp"><button className={styles.mybtn}>{t("Seller")}</button></Link>
                    </div>
                </div>
            </div>
            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h3 className={styles.panel_h3}>{t("already a member !!")}</h3>
                        <p className={styles.panel_para}>
                         {t("login from here  amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!")}
                        </p>
                        <Link to="/auth/login">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                {t("Login")}
                            </button></Link>
                    </div>
                    <img src="/images/Choice-cuate.png" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Role;