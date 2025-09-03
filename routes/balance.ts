import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const transactions = db.transactions;

  const income = transactions.reduce((total: number, transaction: any) => {
    return total + (transaction.amount > 0 ? transaction.amount : 0);
  }, 0);

  const expenses =
    transactions.reduce((total: number, transaction: any) => {
      return total + (transaction.amount <= 0 ? transaction.amount : 0);
    }, 0) * -1;

  const pots = db.pots;
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
