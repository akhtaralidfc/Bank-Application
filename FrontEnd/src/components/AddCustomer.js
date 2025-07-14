// src/components/AddCustomer.js
import React, { useState } from 'react';
import * as adminService from '../api/adminService';
import '../App.css';

function AddCustomer() {
    const [acNo, setAcNo] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        if (!acNo || !name || !balance) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }
        if (isNaN(acNo) || parseInt(acNo) <= 0) {
            setError("Account Number must be a positive integer.");
            setLoading(false);
            return;
        }
        if (isNaN(balance) || parseFloat(balance) < 0) {
            setError("Balance must be a non-negative number.");
            setLoading(false);
            return;
        }

        const customerData = {
            acNo: parseInt(acNo),
            name,
            balance: parseFloat(balance)
        };

        try {
            const response = await adminService.addCustomer(customerData);
            setSuccessMessage(`Customer "${response.name || name}" with Account Number ${response.acNo || acNo} added successfully!`);
            setAcNo('');
            setName('');
            setBalance('');
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to add customer. Please check server logs.");
            console.error("Error adding customer:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-customer-container">
            <h3>Add New Customer</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="acNo">Account Number:</label>
                    <input
                        type="number"
                        id="acNo"
                        value={acNo}
                        onChange={(e) => setAcNo(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="balance">Initial Balance ($):</label>
                    <input
                        type="number"
                        id="balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Customer'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
}

export default AddCustomer;