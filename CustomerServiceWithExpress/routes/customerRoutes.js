import express from 'express';
import { Customer } from '../db.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.post('/deposit', async (req, res) => {
    const { acNo, amount } = req.body;
    const customer = await Customer.findByPk(acNo);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    customer.balance += amount;
    await customer.save();
    await Transaction.create({ acNo, type: 'deposit', amount });
    res.json({ message: 'Deposit successful', newBalance: customer.balance });
});

router.post('/withdraw', async (req, res) => {
    const { acNo, amount } = req.body;
    const customer = await Customer.findByPk(acNo);
    if (!customer || customer.balance < amount)
        return res.status(400).json({ message: 'Invalid operation' });

    customer.balance -= amount;
    await customer.save();
    await Transaction.create({ acNo, type: 'withdrawal', amount });
    res.json({ message: 'Withdrawal successful', newBalance: customer.balance });
});

// Check Balance Endpoint
router.get('/balance/:acNo', async (req, res) => {
    console.log("balanceeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const acNo = req.params.acNo;
    const customer = await Customer.findByPk(acNo);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.json({
        acNo: customer.acNo,
        name: customer.name,
        balance: customer.balance
    });
});


router.get('/transactions/:acNo', async (req, res) => {
    const transactions = await Transaction.find({ acNo: req.params.acNo }).sort({ date: -1 });
    res.json(transactions);
});

export default router;
