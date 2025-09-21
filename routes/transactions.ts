import { Router, type Request, type Response } from 'express';
import { transactionsParser } from '../middlewares/index.js';
import type { TransactionInput, TransactionModel } from '../types/index.js';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';
import { transFormExampleTransactions } from '../utils/index.js';

const router = Router();

// --------- Get All
router.get('/', async (req, res) => {
  const userFromToken = req.user!;
  const transactions = await Transaction.find({ userId: userFromToken.userId });

  //trnasfrom dates if user is example user
  if (userFromToken.username === 'ExampleUser') {
    const plain = transactions.map((t) => t.toJSON());
    const transformed = transFormExampleTransactions(plain);
    return res.send(transFormExampleTransactions(transformed));
  }

  res.send(transactions);
});

// --------- Get one
// router.get('/:id', async (req, res) => {
//   const id = req.params.id;
//   const userFromToken = req.user!;

//   const transaction = await Transaction.findById(id);
//   if (!transaction) {
//     return res.status(404).json({ error: 'Pot not found' });
//   }

//   if (transaction.userId.toString() !== userFromToken.userId) {
//     return res.status(403).json({ error: 'unauthorized' });
//   }

//   res.send(transaction);
// });

// --------- Create new
router.post('/', transactionsParser, async (req: Request<{}, {}, TransactionInput>, res: Response) => {
  const userFromToken = req.user!;

  const newtransObject: TransactionModel = {
    ...req.body,
    date: new Date(),
    userId: userFromToken.userId,
  };

  const newTransaction = new Transaction(newtransObject);
  const savedTransaction = await newTransaction.save();

  const owner = await User.findById(userFromToken.userId);
  if (!owner) {
    return res.status(500).json({ error: 'Unexpected error finding user' });
  }

  owner.transactions.push(savedTransaction.id);
  await owner.save();

  res.status(201).send(savedTransaction);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Transaction.findByIdAndDelete(id);
  res.send();
});

export default router;
