"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
    budgets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Budget',
        },
    ],
    pots: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Pot',
        },
    ],
});
UserSchema.set('toJSON', {
    transform: function (doc, returnedObj) {
        (returnedObj.id = returnedObj._id), delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;
    },
});
var User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
