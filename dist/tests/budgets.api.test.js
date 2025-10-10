import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../index.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import User from '../models/user.js';
import Budget from '../models/budget.js';
const api = supertest(app);
describe('Testing budget route', async () => {
    beforeEach(async () => {
        await dbHelper.clearDb();
        await dbHelper.loadTestData();
    });
    test('Returns all budgets', async () => {
        const budgets = await Budget.find({});
        const response = await api.get('/budgets').expect(200);
        assert.strictEqual(response.body.length, budgets.length);
    });
    test('Returns a specific budget by its id', async () => {
        const budgets = await Budget.find({});
        const response = await api.get(`/budgets/${budgets[0].id}`).expect(200);
        assert.strictEqual(response.body.category, budgets[0].category);
    });
    test('Creates a new budget', async () => {
        const user = await User.findOne({});
        const newBudget = {
            category: 'Entertainment',
            maximum: 50.0,
            theme: '#277C78',
            userId: user.id,
        };
        await api.post('/budgets').send(newBudget).expect(201);
    });
    test('Forbids to create a budget without userId', async () => {
        const newBudget = {
            category: 'Entertainment',
            maximum: 50.0,
            theme: '#277C78',
        };
        await api.post('/budgets').send(newBudget).expect(400);
    });
    test('Deletes a budget', async () => {
        const budgetsAtStart = await Budget.find({});
        await api.delete(`/budgets/${budgetsAtStart[0].id}`).expect(204);
        const budgetsAtEnd = await Budget.find({});
        assert.strictEqual(budgetsAtEnd.length, budgetsAtStart.length - 1);
    });
    test('Updates a budget', async () => {
        const oldBudget = await Budget.findOne({});
        const updatedBudget = {
            category: 'Test_category',
            maximum: oldBudget.maximum,
            theme: oldBudget.theme,
            userId: oldBudget.userId,
        };
        const result = await api.put(`/budgets/${oldBudget.id}`).send(updatedBudget).expect(201);
        const returnedBudget = result.body;
        assert.strictEqual(returnedBudget.category, updatedBudget.category);
    });
    after(async () => {
        await mongoose.connection.close();
    });
});
//# sourceMappingURL=budgets.api.test.js.map