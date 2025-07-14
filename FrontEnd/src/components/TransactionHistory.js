import React, { useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
    const [acNo, setAcNo] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false);

    const handleFetchTransactions = async () => {
        if (!acNo) {
            setError('Please enter an account number');
            return;
        }

        setLoading(true);
        setError('');
        setShowTable(false);

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8082/CustomerService/transactions/${acNo}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTransactions(response.data);
            setShowTable(true);
        } catch (err) {
            setError('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Transaction History</h2>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={acNo}
                    onChange={(e) => setAcNo(e.target.value)}
                    placeholder="Enter Account Number"
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={handleFetchTransactions} style={{ padding: '8px 12px' }}>
                    View Transactions
                </button>
            </div>

            {loading && <p>Loading transactions...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {showTable && transactions.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <table border="1" cellPadding="8" style={{ width: '60%', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn, index) => (
                                <tr key={index}>
                                    <td>{new Date(txn.date).toLocaleString()}</td>
                                    <td>{txn.type}</td>
                                    <td>{txn.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {showTable && transactions.length === 0 && (
                <p style={{ marginTop: '1rem' }}>No transactions found for account {acNo}.</p>
            )}
        </div>
    );
};

export default TransactionHistory;
