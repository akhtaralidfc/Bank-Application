// src/components/Deposit.js
import React, { useState } from 'react';
import * as customerService from '../api/customerService';
import '../App.css';

function Deposit() {
    const [acNo, setAcNo] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleDeposit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        if (!acNo || !amount) {
            setError("Account number and amount are required.");
            setLoading(false);
            return;
        }
        if (isNaN(acNo) || parseInt(acNo) <= 0) {
            setError("Account Number must be a positive integer.");
            setLoading(false);
            return;
        }
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Amount must be a positive number.");
            setLoading(false);
            return;
        }

        try {
            const response = await customerService.depositFunds(parseInt(acNo), parseFloat(amount));
            setSuccessMessage(`Successfully deposited $${parseFloat(amount).toFixed(2)} to account ${acNo}. New balance: $${response.newBalance.toFixed(2)}`);
            setAcNo('');
            setAmount('');
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Deposit failed. Please try again.");
            console.error("Error depositing funds:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-container">
            <h3>Deposit Funds</h3>
            <form onSubmit={handleDeposit}>
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
                    <label htmlFor="amount">Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        min="0.01"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Deposit'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
}

export default Deposit;