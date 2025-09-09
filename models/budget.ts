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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

budgetSchema.set('toJSON', {
  transform: (document, returnedObj: any) => {
    const id = returnedObj._id.toString();
    returnedObj.id = id;
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  },
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
