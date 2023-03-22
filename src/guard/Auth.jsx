import axios from "axios";
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole ] = useState(null);

    const login = (token, role) => {
        setToken(token);
        setRole(role);
    }

    const userToken = localStorage.getItem('user-token');


    const logout = () => {
        axios.patch('https://handy-market-api.onrender.com/api/v1/auth/logOut', {}, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        }).then(res => {
            localStorage.clear();
            
        }).catch(err => console.log)
    }

    return <AuthContext.Provider value={{ token, role, login, logout }}>{ children }</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};