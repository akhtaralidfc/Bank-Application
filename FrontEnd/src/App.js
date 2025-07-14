import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage.js';
import AdminDashboard from './pages/AdminDashboard.js';
import CustomerDashboard from './pages/CustomerDashboard.js';
import AddCustomer from './components/AddCustomer.js';
import CustomerList from './components/CustomerList.js';
import SearchCustomer from './components/SearchCustomer.js';
import Deposit from './components/Deposit.js';
import Withdraw from './components/Withdraw.js'; // Corrected import
import CheckBalance from './components/CheckBalance.js';
import LoginPage from './pages/LoginPage.js';
import Navbar from './components/Navbar.js';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

function AppContent() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Modern Bank Application</h1>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute allowedRoles={['ADMIN']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    >
                        <Route path="add" element={<AddCustomer />} />
                        <Route path="list" element={<CustomerList />} />
                        <Route path="search" element={<SearchCustomer />} />
                        <Route path="transactions" element={<TransactionHistory />} />
                        <Route index element={<div className="no-results-message">Select an Admin action from the menu.</div>} />
                    </Route>

                    {/* Customer Routes */}
                    <Route
                        path="/customer"
                        element={
                            <PrivateRoute allowedRoles={['CUSTOMER']}>
                                <CustomerDashboard />
                            </PrivateRoute>
                        }
                    >
                        <Route path="deposit" element={<Deposit />} />
                        <Route path="withdraw" element={<Withdraw />} />
                        <Route path="balance" element={<CheckBalance />} />
                        <Route index element={<div className="no-results-message">Select a Customer action from the menu.</div>} />
                    </Route>

                    {/* Fallback for unknown routes */}
                    <Route path="*" element={<div className="error-message">404 - Page Not Found</div>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;