// src/pages/AdminDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

// function AdminDashboard() {
//     const { isAdmin } = useAuth();

//     if (!isAdmin) {
//         return <div className="error-message">You are not authorized to view this page.</div>;
//     }

//     return (
//         <div className="admin-dashboard-container">
//             <h2>Admin Dashboard</h2>
//             <nav className="dashboard-nav">
//                 <ul>
//                     <li><Link to="/admin/add">Add Customer</Link></li>
//                     <li><Link to="/admin/list">View All Customers</Link></li>
//                     <li><Link to="/admin/search">Search Customer</Link></li>
//                 </ul>
//             </nav>
//             <div className="dashboard-content">
//                 <Outlet />
//             </div>
//         </div>
//     );
// }

// export default AdminDashboard;

const AdminDashboard = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <div className="error-message">You are not authorized to view this page.</div>;
    }
    return (
        <div className="admin-dashboard">
            <div className="admin-nav">
                <Link to="add" className="admin-btn">Add Customer</Link>
                <Link to="list" className="admin-btn">Customer List</Link>
                <Link to="search" className="admin-btn">Search Customer</Link>
                <Link to="transactions" className="admin-btn">View Transactions</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminDashboard;
