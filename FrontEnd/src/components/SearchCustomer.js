// src/components/SearchCustomer.js
import React, { useState } from 'react';
import * as adminService from '../api/adminService';
import '../App.css';

function SearchCustomer() {
    const [acNo, setAcNo] = useState('');
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCustomer(null);
        setSearched(true);

        if (!acNo.trim()) {
            setError("Please enter an account number.");
            setLoading(false);
            return;
        }
        if (isNaN(acNo) || parseInt(acNo) <= 0) {
            setError("Account Number must be a positive integer.");
            setLoading(false);
            return;
        }

        try {
            const result = await adminService.searchCustomer(parseInt(acNo));
            setCustomer(result);
        } catch (err) {
            console.log(err);
            setError(err.response?.data|| "Failed to search customer. Account not found or server error.");
            console.error("Error searching customer:", err);
            setCustomer(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-customer-container">
            <h3>Search Customer by Account Number</h3>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="acNo">Enter Account Number:</label>
                    <input
                        type="number"
                        id="acNo"
                        value={acNo}
                        onChange={(e) => setAcNo(e.target.value)}
                        placeholder="e.g., 12345"
                        required
                        min="1"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {searched && !loading && !error && (
                customer ? (
                    <div className="customer-details">
                        <h4>Customer Found:</h4>
                        <p><strong>Account Number:</strong> {customer.acNo}</p>
                        <p><strong>Name:</strong> {customer.name}</p>
                        <p><strong>Current Balance:</strong> ${customer.balance.toFixed(2)}</p>
                    </div>
                ) : (
                    <p className="no-results-message">No customer found with Account Number: {acNo}.</p>
                )
            )}
        </div>
    );
}

export default SearchCustomer;