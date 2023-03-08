
import { Link } from "react-router-dom";

const Role = () => {
    return (
        <div className="mycontainer">
            <div className="forms-container">
                <div className="signin-signup">
                    <div className="sign-in-form myform">
                        <h2 className="title">Roles</h2>
                        <Link to="/register" > <button className="mybtn">Customer</button></Link>
                        <Link to="/sellerSignUp"><button className="mybtn">Seller</button></Link>
                    </div>
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
                        <Link to="/auth/login">
                            <button className="mybtn transparent" id="sign-up-btn">
                                Login
                            </button></Link>
                    </div>
                    <img src="/images/undraw.svg" className="myimage" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Role;