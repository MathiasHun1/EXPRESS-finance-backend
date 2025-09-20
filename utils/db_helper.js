"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_js_1 = require("../models/user.js");
var transaction_js_1 = require("../models/transaction.js");
var pot_js_1 = require("../models/pot.js");
var budget_js_1 = require("../models/budget.js");
var bcrypt_1 = require("bcrypt");
var clearDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_js_1.default.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, transaction_js_1.default.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, pot_js_1.default.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, budget_js_1.default.deleteMany({})];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var loadTestData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, creataDataForUser(users[0], transactions_1, budgets_1, pots_1)];
            case 1:
                _a.sent();
                return [4 /*yield*/, creataDataForUser(users[1], transactions_2, budgets_2, pots_2)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var creataDataForUser = function (user, transactions, budgets, pots) { return __awaiter(void 0, void 0, void 0, function () {
    var passwordHash, userAtStart, savedUser, transactionPromises, savedTransactions, budgetPromises, savedBudgets, potPromises, savedPots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1.default.hash(user.password, 10)];
            case 1:
                passwordHash = _a.sent();
                userAtStart = new user_js_1.default({
                    username: user.username,
                    passwordHash: passwordHash,
                });
                return [4 /*yield*/, userAtStart.save()];
            case 2:
                savedUser = _a.sent();
                transactionPromises = [];
                transactions.forEach(function (trans) {
                    var newTransaction = new transaction_js_1.default(__assign(__assign({}, trans), { userId: savedUser.id })); // Join user Id to the transaction
                    transactionPromises.push(newTransaction.save());
                });
                return [4 /*yield*/, Promise.all(transactionPromises)];
            case 3:
                savedTransactions = _a.sent();
                // Join the transaction id's to the user
                savedTransactions.forEach(function (t) {
                    savedUser.transactions.push(t.id);
                });
                budgetPromises = [];
                budgets.forEach(function (budget) {
                    var newBudget = new budget_js_1.default(__assign(__assign({}, budget), { userId: savedUser.id })); // Join user Id to the transaction
                    budgetPromises.push(newBudget.save());
                });
                return [4 /*yield*/, Promise.all(budgetPromises)];
            case 4:
                savedBudgets = _a.sent();
                // Join the transaction id's to the user
                savedBudgets.forEach(function (b) {
                    savedUser.budgets.push(b.id);
                });
                potPromises = [];
                pots.forEach(function (pot) {
                    var newPot = new pot_js_1.default(__assign(__assign({}, pot), { userId: savedUser.id })); // Join user Id to the transaction
                    potPromises.push(newPot.save());
                });
                return [4 /*yield*/, Promise.all(potPromises)];
            case 5:
                savedPots = _a.sent();
                // Join the transaction id's to the user
                savedPots.forEach(function (p) {
                    savedUser.pots.push(p.id);
                });
                /*-------- Save the user -------*/
                return [4 /*yield*/, savedUser.save()];
            case 6:
                /*-------- Save the user -------*/
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var users = [
    {
        username: 'Kata',
        password: 'traktor',
    },
    {
        username: 'Lajos',
        password: 'valami',
    },
];
var transactions_1 = [
    {
        avatar: './assets/images/avatars/emma-richardson.jpg',
        name: 'Emma Richardson',
        category: 'General',
        date: '2024-08-19T14:23:11Z',
        amount: 2800.5,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/savory-bites-bistro.jpg',
        name: 'Savory Bites Bistro',
        category: 'Dining Out',
        date: '2024-08-19T20:23:11Z',
        amount: -55.5,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/daniel-carter.jpg',
        name: 'Daniel Carter',
        category: 'General',
        date: '2024-08-18T09:45:32Z',
        amount: -42.3,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/sun-park.jpg',
        name: 'Sun Park',
        category: 'General',
        date: '2024-08-17T16:12:05Z',
        amount: 120.0,
        recurring: false,
    },
];
var transactions_2 = [
    {
        avatar: './assets/images/avatars/flavor-fiesta.jpg',
        name: 'Flavor Fiesta',
        category: 'Dining Out',
        date: '2024-07-27T20:15:06Z',
        amount: -42.75,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/harper-edwards.jpg',
        name: 'Harper Edwards',
        category: 'Shopping',
        date: '2024-07-26T09:43:23Z',
        amount: -89.99,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/buzz-marketing-group.jpg',
        name: 'Buzz Marketing Group',
        category: 'General',
        date: '2024-07-26T14:40:23Z',
        amount: 1200.0,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/technova-innovations.jpg',
        name: 'TechNova Innovations',
        category: 'Shopping',
        date: '2024-07-25T16:25:37Z',
        amount: 3400.0,
        recurring: false,
    },
    {
        avatar: './assets/images/avatars/bytewise.jpg',
        name: 'ByteWise',
        category: 'Lifestyle',
        date: '2024-07-23T09:35:14Z',
        amount: -49.99,
        recurring: true,
    },
    {
        avatar: './assets/images/avatars/nimbus-data-storage.jpg',
        name: 'Nimbus Data Storage',
        category: 'Bills',
        date: '2024-07-21T10:05:42Z',
        amount: -9.99,
        recurring: true,
    },
];
var budgets_1 = [
    {
        category: 'Entertainment',
        maximum: 50.0,
        theme: '#277C78',
    },
    {
        category: 'Bills',
        maximum: 750.0,
        theme: '#82C9D7',
    },
    {
        category: 'Dining Out',
        maximum: 75.0,
        theme: '#F2CDAC',
    },
];
var budgets_2 = [
    {
        category: 'Bills',
        maximum: 400.0,
        theme: '#F2CDAC',
    },
    {
        category: 'Dining Out',
        maximum: 140.0,
        theme: '#626070',
    },
    {
        category: 'Entertainment',
        maximum: 90.0,
        theme: '#277C78',
    },
];
var pots_1 = [
    {
        name: 'Savings',
        target: 2000.0,
        total: 159.0,
        theme: '#277C78',
    },
    {
        name: 'Concert Ticket',
        target: 150.0,
        total: 110.0,
        theme: '#626070',
    },
    {
        name: 'Gift',
        target: 150.0,
        total: 110.0,
        theme: '#82C9D7',
    },
    {
        name: 'New Laptop',
        target: 1000.0,
        total: 10.0,
        theme: '#F2CDAC',
    },
    {
        name: 'Holiday',
        target: 1440.0,
        total: 531.0,
        theme: '#826CB0',
    },
];
var pots_2 = [
    {
        name: 'Gift',
        target: 1500.0,
        total: 110.0,
        theme: '#82C9D7',
    },
    {
        name: 'Cat food',
        target: 120.0,
        total: 10.0,
        theme: '#F2CDAC',
    },
    {
        name: 'House renewal',
        target: 11440.0,
        total: 531.0,
        theme: '#826CB0',
    },
];
exports.default = {
    clearDb: clearDb,
    loadTestData: loadTestData,
    creataDataForUser: creataDataForUser,
    transactions_1: transactions_1,
    users: users,
};
