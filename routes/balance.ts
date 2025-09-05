import { Router } from 'express';
import Transaction from '../models/transaction.js';
import Pot from '../models/pot.js';

const router = Router();

router.get('/', async (req, res) => {
  const transactions = await Transaction.find({});

  const income = transactions.reduce((total: number, transaction: any) => {
    return total + (transaction.amount > 0 ? transaction.amount : 0);
  }, 0);

  const expenses =
    transactions.reduce((total: number, transaction: any) => {
      return total + (transaction.amount <= 0 ? transaction.amount : 0);
    }, 0) * -1;

  const pots = await Pot.find({});
  const moneyInPots = pots.reduce((total: number, pot: any) => {
    return total + pot.total;
  }, 0);

  const balance = {
    income,
    expenses,
    current: income - expenses - moneyInPots,
  };

  return res.send(balance);
});

export default router;
