// src/pages/CustomerDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function CustomerDashboard() {
    const { isCustomer } = useAuth();

    if (!isCustomer) {
        return <div className="error-message">You are not authorized to view this page.</div>;
    }

    return (
        <div className="customer-dashboard-container">
            <h2>Customer Dashboard</h2>
            <p>Welcome to your personal banking portal!</p>
            <nav className="dashboard-nav">
                <ul>
                    <li><Link to="/customer/deposit">Deposit Funds</Link></li>
                    <li><Link to="/customer/withdraw">Withdraw Funds</Link></li>
                    <li><Link to="/customer/balance">Check Balance</Link></li>
                </ul>
            </nav>
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
}

export default CustomerDashboard;