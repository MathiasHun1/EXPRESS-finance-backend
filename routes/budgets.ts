import { Router, type Request, type Response } from 'express';
import { budgetParser } from '../middlewares/index.js';
import type { BudgetInput, BudgetModel } from '../types/index.js';
import Budget from '../models/budget.js';
import User from '../models/user.js';

const router = Router();

// Get All
router.get('/', async (req, res) => {
  const userFromToken = req.user!;

  const data = await Budget.find({ userId: userFromToken.userId });
  res.json(data);
});

// Get one
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const userFromToken = req.user!;

  const budget = await Budget.findById(id);

  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  if (budget.userId.toString() !== userFromToken.userId) {
    return res.status(403).json({ error: 'unauthorized' });
  }

  res.send(budget);
});

// --------- Create new
router.post('/', budgetParser, async (req: Request<unknown, unknown, BudgetInput>, res: Response) => {
  const userFromToken = req.user!;

  const newBudget = new Budget({ ...req.body, userId: userFromToken.userId });
  const savedBudget = await newBudget.save();

  const owner = await User.findById(userFromToken.userId);
  if (!owner) {
    return res.status(500).json({ error: 'Unexpected error finding user' });
  }

  owner.budgets.push(savedBudget.id);
  await owner.save();

  res.status(201).json(savedBudget);
});

// -------- Delete one
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const userFromToken = req.user!;

  const budget = await Budget.findById(id);
  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  if (budget.userId.toString() !== userFromToken.userId) {
    return res.status(403).json({ error: 'unauthorized' });
  }

  await Budget.findByIdAndDelete(id);
  res.status(204).send();
});

// ---------- Update one
router.put('/:id', budgetParser, async (req: Request<{ id: string }, unknown, BudgetInput>, res) => {
  const id = req.params.id;
  const userFromToken = req.user!;
  const updatedBudget = req.body;

  const budget = await Budget.findById(id);
  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  if (budget.userId.toString() !== userFromToken.userId) {
    return res.status(403).json({ error: 'unauthorized' });
  }

  const returnedBudget = await Budget.findByIdAndUpdate(id, { ...updatedBudget, id }, { returnDocument: 'after' });

  res.status(201).send(returnedBudget);
});

export default router;
