import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import dbHelper from '../utils/db_helper.js';
import { test, beforeEach, describe, after } from 'node:test';
import assert from 'node:assert';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const api = supertest(app);

describe('testing budget routes', async () => {
  beforeEach(async () => {
    await dbHelper.clearDb();
    await dbHelper.loadTestData();
  });

  test('', async () => {
    assert(true);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
