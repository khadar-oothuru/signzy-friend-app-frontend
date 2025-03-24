import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is logged in when app is loaded
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const { data } = await API.post("/login", { email, password });
            // Store the token and user information in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user); // Update the user state
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); // Reset the user state
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
