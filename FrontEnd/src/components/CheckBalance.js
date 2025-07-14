// src/components/CheckBalance.js
import React, { useState } from 'react';
import * as customerService from '../api/customerService';
import '../App.css';

function CheckBalance() {
    const [acNo, setAcNo] = useState('');
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleCheckBalance = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setBalance(null);
        setSearched(true);

        if (!acNo.trim()) {
            setError("Account number is required.");
            setLoading(false);
            return;
        }
        if (isNaN(acNo) || parseInt(acNo) <= 0) {
            setError("Account Number must be a positive integer.");
            setLoading(false);
            return;
        }

        try {
            const response = await customerService.checkBalance(parseInt(acNo));
            setBalance(response.balance);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to check balance. Account not found or service error.");
            console.error("Error checking balance:", err);
            setBalance(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="check-balance-container">
            <h3>Check Account Balance</h3>
            <form onSubmit={handleCheckBalance}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Balance'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {searched && !loading && !error && (
                balance !== null ? (
                    <div className="balance-display">
                        <h4>Current Balance for Account {acNo}:</h4>
                        <p className="balance-amount">${balance.toFixed(2)}</p>
                    </div>
                ) : (
                    <p className="no-results-message">No balance found for account: {acNo}. Please verify the number.</p>
                )
            )}
        </div>
    );
}

export default CheckBalance;