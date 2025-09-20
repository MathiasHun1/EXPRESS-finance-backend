"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var potSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
});
potSchema.set('toJSON', {
    transform: function (document, returnedObj) {
        var id = returnedObj._id.toString();
        returnedObj.id = id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    },
});
var Pot = mongoose_1.default.model('Pot', potSchema);
exports.default = Pot;
