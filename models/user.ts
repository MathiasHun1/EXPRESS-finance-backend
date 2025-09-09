import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  budgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget',
    },
  ],
  pots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pot',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;
