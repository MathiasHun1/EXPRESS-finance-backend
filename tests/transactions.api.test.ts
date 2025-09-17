import supertest from 'supertest';
import app from '../app.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { getTestToken } from '../utils/test_helpers.js';

const api = supertest(app);

describe('testing transaction routes', async () => {
  let token: string;
  let user: any;
  let initialTransactions: any;

  const newTransaction = {
    avatar: './assets/images/avatars/liam-hughes.jpg',
    name: 'Liam Hughes',
    category: 'Groceries',
    date: '2024-08-15T18:20:33Z',
    amount: 65.75,
    recurring: false,
  };

  beforeEach(async () => {
    // Reset Db state
    await dbHelper.clearDb();
    await dbHelper.loadTestData();

    // Get an user
    user = await User.findOne();
    initialTransactions = await Transaction.find({ userId: user._id });
    token = getTestToken(user!.username, user!._id.toString());
  });

  test('Returns all transactions from db', async () => {
    const result = await api
      .get('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-type', /application\/json/);

    assert.equal(result.body.length, initialTransactions.length);
  });

  test('Adds a new transaction succesfully and returns a correct object', async () => {
    const newTransaction = {
      avatar: './assets/images/avatars/liam-hughes.jpg',
      name: 'Liam Hughes',
      category: 'Groceries',
      amount: 65.75,
      recurring: false,
      userId: user._id,
    };

    const result = await api.post('/transactions').set('Authorization', `Bearer ${token}`).send(newTransaction).expect(201);
    const dataAtEnd = await Transaction.find({ userId: user._id });

    assert.strictEqual(initialTransactions.length + 1, dataAtEnd.length);
    assert.ok(result.body.hasOwnProperty('date'));
  });

  test('fails adding a transaction without wrong data types', async () => {
    const wrongData = { ...newTransaction, name: undefined };
    const wrongData2 = { ...newTransaction, amount: '300' };

    await api.post('/transactions').set('Authorization', `Bearer ${token}`).send(wrongData).expect(400);
    await api.post('/transactions').set('Authorization', `Bearer ${token}`).send(wrongData2).expect(400);

    const dataAtEnd = await Transaction.find({ userId: user._id });

    assert.strictEqual(initialTransactions.length, dataAtEnd.length);
  });

  test("posted transaction's Id sucessfully added to the user", async () => {
    const result = await api.post('/transactions').set('Authorization', `Bearer ${token}`).send(newTransaction).expect(201);

    const savedTransactionId = result.body.id;
    const updatedUser = await User.findById(user._id);

    assert.ok(updatedUser!.transactions.includes(savedTransactionId));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
