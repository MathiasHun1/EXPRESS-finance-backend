import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import Pot from '../models/pot.js';
import Budget from '../models/budget.js';

const clearDb = async () => {
  await User.deleteMany({});
  await Transaction.deleteMany({});
  await Pot.deleteMany({});
  await Budget.deleteMany({});
};

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

export default {
  clearDb,
  initialTransactions,
};
