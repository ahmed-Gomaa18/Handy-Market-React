import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (token) => {
        setToken(token);
    }

    const logout = (token) => {
        localStorage.clear();
        setToken(null);
    }

    return <AuthContext.Provider value={{ token,  login, logout }}>{ children }</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
};