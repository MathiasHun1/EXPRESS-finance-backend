import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  maximum: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
