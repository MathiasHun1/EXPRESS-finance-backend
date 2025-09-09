import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import Pot from '../models/pot.js';
import Budget from '../models/budget.js';
import type { UserModel } from '../types/index.js';
import bcrypt from 'bcrypt';

const clearDb = async () => {
  await User.deleteMany({});
  await Transaction.deleteMany({});
  await Pot.deleteMany({});
  await Budget.deleteMany({});
};

const loadTestData = async () => {
  const user = initialUsers[0];
  if (!user) {
    return console.error('No user found');
  }

  /*-------- Create and save a new user to db -------*/

  const passwordHash = await bcrypt.hash(user.password, 10);
  const userAtStart = new User({
    username: user.username,
    passwordHash,
  });

  const savedUser = await userAtStart.save();

  /*-------- Save the transactions and save them to db -------*/
  const transactionPromises: any[] = [];
  initialTransactions.forEach((trans) => {
    const newTransaction = new Transaction({ ...trans, userId: savedUser.id }); // Join user Id to the transaction
    transactionPromises.push(newTransaction.save());
  });

  const savedTransactions = await Promise.all(transactionPromises);

  // Join the transaction id's to the user
  savedTransactions.forEach((t) => {
    savedUser.transactions.push(t.id);
  });

  /*-------- Save the budgets and save them to db -------*/
  const budgetPromises: any[] = [];
  initialBudgets.forEach((budget) => {
    const newBudget = new Budget({ ...budget, userId: savedUser.id }); // Join user Id to the transaction
    budgetPromises.push(newBudget.save());
  });

  const savedBudgets = await Promise.all(budgetPromises);
  // Join the transaction id's to the user
  savedBudgets.forEach((b) => {
    savedUser.budgets.push(b.id);
  });

  /*-------- Save the post and save them to db -------*/
  const potPromises: any[] = [];
  initialPots.forEach((pot) => {
    const newPot = new Pot({ ...pot, userId: savedUser.id }); // Join user Id to the transaction
    potPromises.push(newPot.save());
  });

  const savedPots = await Promise.all(potPromises);
  // Join the transaction id's to the user
  savedPots.forEach((p) => {
    savedUser.pots.push(p.id);
  });

  /*-------- Save the user -------*/
  await savedUser.save();
};

const initialUsers = [
  {
    username: 'Lajos',
    password: 'valami',
  },
];

const initialTransactions = [
  {
    avatar: './assets/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    date: '2024-08-19T14:23:11Z',
    amount: 75.5,
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

const initialBudgets = [
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

const initialPots = [
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

export default {
  clearDb,
  loadTestData,
  initialTransactions,
};
