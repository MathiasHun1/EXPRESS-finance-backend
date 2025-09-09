import supertest from 'supertest';
import app from '../app.js';
import { test, describe, beforeEach, after } from 'node:test';
import assert from 'node:assert';
import dbHelper from '../utils/db_helper.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const api = supertest(app);

describe('users API test', () => {
  beforeEach(async () => {
    await dbHelper.clearDb();
    await dbHelper.loadTestData();
  });

  test('Get users succesfully', async () => {
    const user = await User.findOne({});

    const result = await api.get('/users').expect(200);
    assert.strictEqual(result.body[0].username, user!.username);
  });

  test('Create a new user succesfully', async () => {
    const usersAtStart = await User.find({});

    const resut = await api.post('/users').send({ username: 'Pisti', password: 'akarmi' }).expect(201);
    const savedUser = await User.findById(resut.body.id);

    const passwordCompare = await bcrypt.compare('akarmi', savedUser!.passwordHash);
    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
    assert.ok(passwordCompare);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
