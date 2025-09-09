import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const url = process.env.MONGODB_URI;
const data = JSON.parse(fs.readFileSync('data.json'));

// ------------- Schema definitions -----------------//

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  maximum: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

const transactionSchema = new mongoose.Schema({
  avatar: String,
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  recurring: {
    type: Boolean,
    required: true,
  },
});

const potSchema = new mongoose.Schema({
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
});

const Budget = mongoose.model('Budget', budgetSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Pot = mongoose.model('Pot', potSchema);

// ------------- Helper functions -----------------//

const saveBudgets = async () => {
  const promises = [];

  data.budgets.forEach((b) => {
    const budgetToSave = new Budget({
      category: b.category,
      maximum: b.maximum,
      theme: b.theme,
    });

    const result = budgetToSave.save();
    promises.push(result);
  });

  await Promise.all(promises);
};

const saveTransactions = async () => {
  const promises = [];

  data.transactions.forEach((trans) => {
    delete trans.id;
    const transToSave = new Transaction({
      ...trans,
    });

    const result = transToSave.save();
    promises.push(result);
  });

  await Promise.all(promises);
};

const savePots = async () => {
  const promises = [];

  data.pots.forEach((pot) => {
    const potToSave = new Pot(pot);

    const result = potToSave.save();
    promises.push(result);
  });

  await Promise.all(promises);
};

// ------------- Main functions -----------------//

const uploadData = async () => {
  try {
    await mongoose.connect(url);

    try {
      await saveBudgets();
      await saveTransactions();
      await savePots();
      console.log('Data succesfully saved!');
    } catch (error) {
      console.log(error);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.log('Error: ', error);
  }
};

const deleteData = async () => {
  await mongoose.connect(url);

  const result = await Budget.deleteMany({});
  const result2 = await Transaction.deleteMany({});
  const result3 = await Pot.deleteMany({});
  console.log(result);
  console.log(result2);
  console.log(result3);
  await mongoose.disconnect();
  console.log('DB disconnected');
};

const getData = async () => {
  await mongoose.connect(url);

  const data = await Pot.find({});
  console.log(data[0].id);

  await mongoose.disconnect();
  console.log('DB disconnected');
};

// ------------- Run one of them -----------------//

deleteData();
// getData();
// uploadData();
