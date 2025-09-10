import { Router, type Request, type Response } from 'express';
import { transactionsParser } from '../middlewares/index.js';
import type { TransactionModel } from '../types/index.js';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const transactions = await Transaction.find({});
  res.send(transactions);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findById(id).populate('userId');

  res.send(transaction);
});

router.post('/', transactionsParser, async (req: Request<unknown, unknown, TransactionModel>, res: Response) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User Id missing!' });
  }

  const newtransObject: TransactionModel = {
    ...req.body,
    date: new Date(),
  };

  const user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(400).json({ error: 'User not found!' });
  }

  const newTransaction = new Transaction(newtransObject);
  const savedTransaction = await newTransaction.save();
  user.transactions.push(savedTransaction.id);
  await user.save();

  res.status(201).send(savedTransaction);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Transaction.findByIdAndDelete(id);
  res.send();
});

export default router;
