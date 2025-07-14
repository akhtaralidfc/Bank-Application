// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Navbar() {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="main-navbar">
            <Link to="/">Home</Link>
            {isAuthenticated && userRole === 'ADMIN' && (
                <Link to="/admin">Admin Dashboard</Link>
            )}
            {isAuthenticated && userRole === 'CUSTOMER' && (
                <Link to="/customer">Customer Dashboard</Link>
            )}

            <div className="navbar-auth-section">
                {isAuthenticated ? (
                    <>
                        <span>Logged in as: {userRole}</span>
                        <button onClick={handleLogout} className="button logout-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="button">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;