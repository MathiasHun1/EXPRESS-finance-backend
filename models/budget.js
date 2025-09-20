"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var budgetSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
});
budgetSchema.set('toJSON', {
    transform: function (document, returnedObj) {
        var id = returnedObj._id.toString();
        returnedObj.id = id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    },
});
var Budget = mongoose_1.default.model('Budget', budgetSchema);
exports.default = Budget;
