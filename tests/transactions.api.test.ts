import supertest from 'supertest';
import app from '../app.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';

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
    await dbHelper.clearDb();
    const initialDataPromises = initialData.map((trans) => {
      const transaction = new Transaction(trans);
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
    await api.post('/transactions').send(newTrans).expect(201);
    const dataAtEnd = await Transaction.find({});

    assert.strictEqual(dataAtStart.length + 1, dataAtEnd.length);
  });

  test('fails without name field', async () => {
    const wrongData = { ...newTrans, name: undefined };
    const wrongData2 = { ...newTrans, amount: '300' };
    const dataAtStart = await Transaction.find({});

    await api.post('/transactions').send(wrongData).expect(400);
    await api.post('/transactions').send(wrongData2).expect(400);
    const dataAtEnd = await Transaction.find({});

    assert.strictEqual(dataAtStart.length, dataAtEnd.length);
  });

  after(() => {
    mongoose.connection.close();
  });
});
