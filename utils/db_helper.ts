import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import Pot from '../models/pot.js';
import Budget from '../models/budget.js';
import type { BudgetModel, PotModel, TransactionModel, UserModel } from '../types/index.js';
import type { PotInput, TransactionInput, BudgetInput } from '../types/index.js';
import bcrypt from 'bcrypt';

interface PlainUser {
  username: string;
  password: string;
  email: string;
}

const clearDb = async () => {
  await User.deleteMany({});
  await Transaction.deleteMany({});
  await Pot.deleteMany({});
  await Budget.deleteMany({});
};

const loadTestData = async () => {
  await creataDataForUser(users[0]!, transactions_1, budgets_1, pots_1);
  await creataDataForUser(users[1]!, transactions_2, budgets_2, pots_2);
};

const creataDataForUser = async (user: PlainUser, transactions: TransactionInput[], budgets: BudgetInput[], pots: PotInput[]) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const userAtStart = new User({
    username: user.username,
    passwordHash,
    email: user.email,
    isVerified: true,
  });

  const savedUser = await userAtStart.save();

  /*-------- Save the transactions and save them to db -------*/
  const transactionPromises: any[] = [];
  transactions.forEach((trans) => {
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
  budgets.forEach((budget) => {
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
  pots.forEach((pot) => {
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

const users = [
  {
    username: 'Kata',
    password: 'traktor',
    email: 'kata@hotmail.com',
  },
  {
    username: 'Lajos',
    password: 'valami',
    email: 'lajos@hotmail.com',
  },
];

const transactions_1 = [
  {
    avatar: './assets/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    date: '2024-08-19T14:23:11Z',
    amount: 2800.5,
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
const transactions_2 = [
  {
    avatar: './assets/images/avatars/flavor-fiesta.jpg',
    name: 'Flavor Fiesta',
    category: 'Dining Out',
    date: '2024-07-27T20:15:06Z',
    amount: -42.75,
    recurring: false,
  },
  {
    avatar: './assets/images/avatars/harper-edwards.jpg',
    name: 'Harper Edwards',
    category: 'Shopping',
    date: '2024-07-26T09:43:23Z',
    amount: -89.99,
    recurring: false,
  },
  {
    avatar: './assets/images/avatars/buzz-marketing-group.jpg',
    name: 'Buzz Marketing Group',
    category: 'General',
    date: '2024-07-26T14:40:23Z',
    amount: 1200.0,
    recurring: false,
  },
  {
    avatar: './assets/images/avatars/technova-innovations.jpg',
    name: 'TechNova Innovations',
    category: 'Shopping',
    date: '2024-07-25T16:25:37Z',
    amount: 3400.0,
    recurring: false,
  },
  {
    avatar: './assets/images/avatars/bytewise.jpg',
    name: 'ByteWise',
    category: 'Lifestyle',
    date: '2024-07-23T09:35:14Z',
    amount: -49.99,
    recurring: true,
  },
  {
    avatar: './assets/images/avatars/nimbus-data-storage.jpg',
    name: 'Nimbus Data Storage',
    category: 'Bills',
    date: '2024-07-21T10:05:42Z',
    amount: -9.99,
    recurring: true,
  },
];

const budgets_1 = [
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

const budgets_2 = [
  {
    category: 'Bills',
    maximum: 400.0,
    theme: '#F2CDAC',
  },
  {
    category: 'Dining Out',
    maximum: 140.0,
    theme: '#626070',
  },
  {
    category: 'Entertainment',
    maximum: 90.0,
    theme: '#277C78',
  },
];

const pots_1 = [
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

const pots_2 = [
  {
    name: 'Gift',
    target: 1500.0,
    total: 110.0,
    theme: '#82C9D7',
  },
  {
    name: 'Cat food',
    target: 120.0,
    total: 10.0,
    theme: '#F2CDAC',
  },
  {
    name: 'House renewal',
    target: 11440.0,
    total: 531.0,
    theme: '#826CB0',
  },
];

export default {
  clearDb,
  loadTestData,
  creataDataForUser,
  transactions_1,
  users,
};
