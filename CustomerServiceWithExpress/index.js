import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './db.js';
import connectMongo from './mongo.js';
import customerRoutes from './routes/customerRoutes.js';
const app = express();
const PORT = 8082;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to DB
sequelize.authenticate()
    .then(() => console.log('✅ Connected to MySQL DB'))
    .catch(err => console.error('❌ DB connection error:', err));

// --- Authorization Middleware ---
const authorizeCustomer = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No valid token provided' });
    }
    const token = authHeader.split(' ')[1];
    if (token === btoa('customer_token_jwt_mock')) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// --- Deposit ---
app.post('/CustomerService/deposit', authorizeCustomer, async (req, res) => {
    try {
        const { acNo, amount } = req.body;
        if (!acNo || !amount || isNaN(acNo) || isNaN(amount) || acNo <= 0 || amount <= 0) {
            return res.status(400).json({ message: 'Invalid input.' });
        }

        const customer = await Customer.findByPk(acNo);
        if (!customer) {
            return res.status(404).json({ message: `Account ${acNo} not found.` });
        }

        customer.balance += parseFloat(amount);
        await customer.save();
        console.log(`Deposited ₹${amount} to account ${acNo}.`);
        res.status(200).json({ message: 'Deposit successful', newBalance: customer.balance });

    } catch (error) {
        res.status(500).json({ message: 'Error processing deposit', error: error.message });
    }
});

// --- Withdraw ---
app.post('/CustomerService/withdraw', authorizeCustomer, async (req, res) => {
    try {
        const { acNo, amount } = req.body;
        if (!acNo || !amount || isNaN(acNo) || isNaN(amount) || acNo <= 0 || amount <= 0) {
            return res.status(400).json({ message: 'Invalid input.' });
        }

        const customer = await Customer.findByPk(acNo);
        if (!customer) {
            return res.status(404).json({ message: `Account ${acNo} not found.` });
        }

        if (customer.balance < parseFloat(amount)) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }

        customer.balance -= parseFloat(amount);
        await customer.save();
        console.log(`Withdrew ₹${amount} from account ${acNo}.`);
        res.status(200).json({ message: 'Withdrawal successful', newBalance: customer.balance });

    } catch (error) {
        res.status(500).json({ message: 'Error processing withdrawal', error: error.message });
    }
});

// --- Balance Check ---
app.get('/CustomerService/balance/:acNo', authorizeCustomer, async (req, res) => {
    try {
        const acNo = parseInt(req.params.acNo);
        if (isNaN(acNo) || acNo <= 0) {
            return res.status(400).json({ message: 'Invalid account number.' });
        }

        const customer = await Customer.findByPk(acNo);
        if (!customer) {
            return res.status(404).json({ message: `Account ${acNo} not found.` });
        }

        res.status(200).json({
            acNo: customer.acNo,
            name: customer.name,
            balance: customer.balance
        });

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving balance', error: error.message });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Customer Microservice running at http://localhost:${PORT}`);
});
