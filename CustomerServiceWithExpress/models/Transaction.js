import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    acNo: Number,
    type: { type: String, enum: ['deposit', 'withdrawal'] },
    amount: Number,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
