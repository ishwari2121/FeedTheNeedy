import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setAuthUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
