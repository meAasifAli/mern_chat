import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authUser")) || null)
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;

export const userAuthprovider = () => {
    return useContext(AuthContext)
}