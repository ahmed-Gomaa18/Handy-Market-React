import { Link } from "react-router-dom";
import styles from './Role.module.css'

const Role = () => {
    return (
        <div className={styles.mycontainer}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <div className={styles.myform}>
                        <h2 className="title">Roles</h2>
                        <Link to="/register" > <button className={styles.mybtn}>Customer</button></Link>
                        <Link to="/sellerSignUp"><button className={styles.mybtn}>Seller</button></Link>
                    </div>
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
                        <Link to="/auth/login">
                            <button className={`${styles.mybtn} ${styles.transparent}`} id="sign-up-btn">
                                Login
                            </button></Link>
                    </div>
                    <img src="/images/undraw.svg" className={styles.myimage} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Role;