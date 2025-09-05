import { Router, type Request, type Response } from 'express';
import { budgetParser } from '../middlewares/index.js';
import type { BudgetModel } from '../types/index.js';
import Budget from '../models/budget.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await Budget.find({});
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const budget = await Budget.findById(id);

  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  res.send(budget);
});

router.post('/', budgetParser, async (req: Request<unknown, unknown, BudgetModel>, res: Response) => {
  const newBudget = new Budget(req.body);
  const result = await newBudget.save();

  res.status(201).json(result);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Budget.findByIdAndDelete(id);

  res.status(204).send();
});

router.put('/:id', async (req: Request<{ id: string }, unknown, BudgetModel>, res) => {
  const { id } = req.params;
  const updatedBudget = req.body;

  await Budget.findByIdAndUpdate(id, updatedBudget, { returnDocument: 'after' });

  res.json(updatedBudget);
});

export default router;
