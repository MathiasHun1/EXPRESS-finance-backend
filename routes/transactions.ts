import { Router, type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { transactionsParser } from '../utils/index.js';
import type { TransactionModel } from '../models/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.data.transactions);
});

router.post('/', transactionsParser, (req: Request<unknown, unknown, TransactionModel>, res: Response) => {
  const { name, category, amount, recurring, avatar } = req.body;

  const newTransaction: TransactionModel = {
    name,
    avatar,
    category,
    amount,
    recurring,
    id: uuidv4(),
    date: new Date().toISOString(),
  };

  db.data.transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

export default router;
