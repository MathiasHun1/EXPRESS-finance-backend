import { Router, type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { budgetParser } from '../utils/index.js';
import type { BudgetModel, newBudgetModel } from '../models/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.data.budgets);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const budget = db.findBudgetById(id);

  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  res.send(budget);
});

router.post('/', budgetParser, (req: Request<unknown, unknown, newBudgetModel>, res: Response) => {
  const newBudget: BudgetModel = {
    ...req.body,
    id: uuidv4(),
  };

  db.saveBudget(newBudget);
  res.status(201).json(newBudget);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!db.deleteBudget(id)) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  res.status(204).send();
});

router.put('/:id', (req: Request<{ id: string }, unknown, BudgetModel>, res) => {
  const { id } = req.params;

  const updatedBudget = { ...req.body, id };
  if (!db.updateBudget(updatedBudget)) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  res.json(updatedBudget);
});

export default router;
