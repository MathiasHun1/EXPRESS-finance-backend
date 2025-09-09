import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
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

UserSchema.set('toJSON', {
  transform: (doc, returnedObj: any) => {
    (returnedObj.id = returnedObj._id), delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
