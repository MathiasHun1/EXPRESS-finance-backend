import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.transactions);
});

router.post('/', (req, res) => {
  const { name, category, amount, recurring } = req.body;

  // Basic validation
  if (!name || !category || amount == null || recurring == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newTransaction = {
    name,
    category,
    amount,
    recurring,
    id: uuidv4(),
    date: new Date().toISOString(),
  };

  db.transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

export default router;
