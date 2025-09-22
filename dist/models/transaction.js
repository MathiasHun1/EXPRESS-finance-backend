import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true,
    },
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
transactionSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        const id = returnedObj._id.toString();
        returnedObj.id = id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    },
});
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
//# sourceMappingURL=transaction.js.map