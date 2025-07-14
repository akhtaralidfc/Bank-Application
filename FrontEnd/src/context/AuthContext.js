// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as authLogin, logout as authLogout, getToken, getUserRole } from '../api/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        const role = getUserRole();
        if (token && role) {
            // In a real app, you'd validate the token with your backend here
            setIsAuthenticated(true);
            setUserRole(role);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const { token, role } = await authLogin(username, password);
            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', role);
            setIsAuthenticated(true);
            setUserRole(role);
            return { success: true, role };
        } catch (error) {
            console.error("Login failed:", error.message);
            setIsAuthenticated(false);
            setUserRole(null);
            throw error;
        }
    };

    const logout = () => {
        authLogout();
        setIsAuthenticated(false);
        setUserRole(null);
    };

    const isAdmin = userRole === 'ADMIN';
    const isCustomer = userRole === 'CUSTOMER';

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, isAdmin, isCustomer, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};