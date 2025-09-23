import fs from 'fs';
import dbHelper from './db_helper.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const loadExapmleData = async () => {
  const user = {
    username: 'ExampleUser',
    password: 'valami',
    email: 'exampleEmail@hotmail.com',
    isVerified: true,
  };

  const rawData = fs.readFileSync('../data.json');
  const jsonString = rawData.toString('utf-8');
  const dataObject = JSON.parse(jsonString);
  const { transactions, budgets, pots } = dataObject;

  await mongoose.connect(process.env.MONGODB_URI_TEST!);
  await dbHelper.clearDb();
  await dbHelper.creataDataForUser(user, transactions, budgets, pots);
  await mongoose.connection.close();
};

loadExapmleData();
