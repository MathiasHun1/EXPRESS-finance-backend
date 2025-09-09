import supertest from 'supertest';
import app from '../app.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const api = supertest(app);

describe('testing transaction routes', () => {
  const initialData = dbHelper.initialTransactions;
  const newTrans = {
    avatar: './assets/images/avatars/liam-hughes.jpg',
    name: 'Liam Hughes',
    category: 'Groceries',
    date: '2024-08-15T18:20:33Z',
    amount: 65.75,
    recurring: false,
  };

  beforeEach(async () => {
    await dbHelper.clearDb(); // erase all data

    // save a new user and get its Id
    const passwordHash = await bcrypt.hash('valami', 10);
    const newUser = new User({
      username: 'Bela',
      passwordHash: passwordHash,
      pots: [],
      budgets: [],
      transactions: [],
    });
    const savedUser = await newUser.save();

    const initialDataPromises = initialData.map((trans) => {
      const transaction = new Transaction({ ...trans, userId: savedUser.id });
      return transaction.save();
    });

    await Promise.all(initialDataPromises);
  });

  test('Returns all transactions from db', async () => {
    const result = await api
      .get('/transactions')
      .expect(200)
      .expect('Content-type', /application\/json/);

    assert.equal(result.body.length, initialData.length);
  });

  test('Adds a new transaction succesfully', async () => {
    const dataAtStart = await Transaction.find({});

    const user = await User.findOne({});
    const newTransaction = { ...newTrans, userId: user!.id };

    await api.post('/transactions').send(newTransaction).expect(201);
    const dataAtEnd = await Transaction.find({});

    assert.strictEqual(dataAtStart.length + 1, dataAtEnd.length);
  });

  test('fails adding a transaction without user Id', async () => {
    const wrongData = newTrans;
    await api.post('/transactions').send(wrongData).expect(400);
  });

  test('fails adding a transaction without name field', async () => {
    const wrongData = { ...newTrans, name: undefined };
    const wrongData2 = { ...newTrans, amount: '300' };
    const dataAtStart = await Transaction.find({});

    await api.post('/transactions').send(wrongData).expect(400);
    await api.post('/transactions').send(wrongData2).expect(400);
    const dataAtEnd = await Transaction.find({});

    assert.strictEqual(dataAtStart.length, dataAtEnd.length);
  });

  test("posted transaction's Id sucessfully added to the user", async () => {
    const userAtStart = await User.findOne({});

    const userId = userAtStart!.id;
    const newTransaction = { ...newTrans, userId: userId };

    const result = await api.post('/transactions').send(newTransaction).expect(201);
    const savedTransactionId = result.body.id;
    const userAtEnd = await User.findById(userId);

    assert.ok(userAtEnd!.transactions.includes(savedTransactionId));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
