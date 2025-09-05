import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  avatar: String,
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  recurring: {
    type: Boolean,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
