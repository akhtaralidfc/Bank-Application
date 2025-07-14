// src/components/CustomerList.js
import React, { useState, useEffect } from 'react';
import * as adminService from '../api/adminService';
import '../App.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await adminService.listCustomers();
                setCustomers(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to fetch customers.");
                console.error("Error fetching customers:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div className="loading">Loading customers...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="customer-list-container">
            <h3>All Customers</h3>
            {customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Account No.</th>
                            <th>Name</th>
                            <th>Balance ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.acNo}>
                                <td>{customer.acNo}</td>
                                <td>{customer.name}</td>
                                <td>{customer.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomerList;