"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var transactionSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
});
transactionSchema.set('toJSON', {
    transform: function (document, returnedObj) {
        var id = returnedObj._id.toString();
        returnedObj.id = id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    },
});
var Transaction = mongoose_1.default.model('Transaction', transactionSchema);
exports.default = Transaction;
