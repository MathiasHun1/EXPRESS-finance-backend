import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../index.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import User from '../models/user.js';
import Pot from '../models/pot.js';
import { getTestToken } from '../utils/test_helpers.js';
const api = supertest(app);
describe('Testing pots route', () => {
    let token;
    let user;
    beforeEach(async () => {
        // Fill the database
        await dbHelper.clearDb();
        await dbHelper.loadTestData();
        // Get an user
        user = await User.findOne();
        token = getTestToken(user.username, user._id.toString());
    });
    test('Returns all pots', async () => {
        const potsFromDb = await Pot.find({ userId: user._id });
        const result = await api.get('/pots').set('Authorization', `Bearer ${token}`).expect(200);
        assert.strictEqual(potsFromDb.length, result.body.length);
    });
    test('Returns a specific pot by its id', async () => {
        const potFromDb = await Pot.findOne({});
        const result = await api.get(`/pots/${potFromDb.id}`).set('Authorization', `Bearer ${token}`).expect(200);
        assert.strictEqual(potFromDb.name, result.body.name);
    });
    test('Creates a new pot', async () => {
        const newPot = {
            name: 'New car',
            target: 2500,
            theme: '#277C78',
            userId: user.id,
        };
        const result = await api.post('/pots').set('Authorization', `Bearer ${token}`).send(newPot).expect(201);
        assert.strictEqual(result.body.name, newPot.name);
        assert.ok(result.body.total === 0); // check if a total field is added in the route handler
    });
    test('Forbids to create a new pot with missing user Id', async () => {
        const newPot = {
            name: 'New car',
            target: 2500,
            theme: '#277C78',
        };
        await api.post('/pots').send(newPot).expect(401);
    });
    test('Forbids to create a new pot with missing name filed', async () => {
        const newPot = {
            target: 2500,
            theme: '#277C78',
            userId: user.id,
        };
        await api.post('/pots').set('Authorization', `Bearer ${token}`).send(newPot).expect(400);
    });
    test('Deletes a pot by its id', async () => {
        const potsFromDb = await Pot.find({ userId: user.id });
        await api.delete(`/pots/${potsFromDb[0].id}`).set('Authorization', `Bearer ${token}`).expect(204);
        const potsFromDbAfter = await Pot.find({ userId: user.id });
        assert.strictEqual(potsFromDb.length, potsFromDbAfter.length + 1);
    });
    test('Updates a pot', async () => {
        const potFromDb = await Pot.findOne({ userId: user.id });
        const updatedPot = {
            name: potFromDb.name,
            target: potFromDb.target,
            total: 200, //updated field
            theme: potFromDb.theme,
            userId: potFromDb.userId,
        };
        const result = await api.put(`/pots/${potFromDb.id}`).set('Authorization', `Bearer ${token}`).send(updatedPot).expect(201);
    });
    test('Forbids to update pot if the balance is smaller than the added money', async () => {
        const potFromDb = await Pot.findOne({ userId: user.id });
        const updatedPot = {
            name: potFromDb.name,
            target: potFromDb.target,
            total: 20000000, //updated field
            theme: potFromDb.theme,
            userId: potFromDb.userId,
        };
        const result = await api.put(`/pots/${potFromDb.id}`).set('Authorization', `Bearer ${token}`).send(updatedPot).expect(400);
    });
    after(async () => {
        await mongoose.connection.close();
    });
});
//# sourceMappingURL=pots.api.test.js.map