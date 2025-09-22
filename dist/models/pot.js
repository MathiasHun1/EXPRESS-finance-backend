import mongoose from 'mongoose';
const potSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    target: {
        type: Number,
        required: true,
        min: 0,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
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
potSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        const id = returnedObj._id.toString();
        returnedObj.id = id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    },
});
const Pot = mongoose.model('Pot', potSchema);
export default Pot;
//# sourceMappingURL=pot.js.map