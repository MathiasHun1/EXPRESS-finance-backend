import { Router, type Request, type Response } from 'express';
import { newPotParser, updatedPotParser } from '../middlewares/index.js';
import type { PotModel } from '../types/index.js';
import Pot from '../models/pot.js';
import Transaction from '../models/transaction.js';
import { calculateBalance } from '../utils/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const pots = await Pot.find({});
  res.send(pots);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const pot = await Pot.findById(id);

  if (!pot) {
    return res.status(404).json({ error: 'Pot not found' });
  }
  res.json(pot);
});

router.post('/', newPotParser, async (req: Request<unknown, unknown, PotModel>, res: Response) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User Id missing!' });
  }

  const newPot = new Pot({ ...req.body, total: 0 });
  await newPot.save();

  res.status(201).send(newPot);
});

router.put('/:id', updatedPotParser, async (req: Request<{ id: string }, unknown, PotModel>, res: any) => {
  const id = req.params.id;
  const oldData = await Pot.findById(id);
  const updatedData = req.body;

  const transactions = await Transaction.find({});
  const pots = await Pot.find({});
  const balance = calculateBalance(transactions, pots);

  // check if user have enough balance for operation
  let amount: number = 0;

  if (oldData && updatedData) {
    amount = updatedData.total - oldData.total;
  }
  if (balance.current - amount < 0) {
    return res.status(400).json({ error: 'Insufficient funds!' });
  }

  const updatedPot = await Pot.findByIdAndUpdate(id, updatedData, { returnDocument: 'after' });

  res.status(201).send(updatedPot);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Pot.findByIdAndDelete(id);

  res.status(204).send();
});

export default router;
