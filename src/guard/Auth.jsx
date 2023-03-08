import axios from "axios";
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (token) => {
        setToken(token);
    }

    const logout = (token) => {
        axios.patch('http://localhost:3000/api/v1/auth/logOut', {}, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => {
            localStorage.clear();
            setToken(null);
        }).catch(err => console.log)
    }

    return <AuthContext.Provider value={{ token,  login, logout }}>{ children }</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};