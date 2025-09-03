import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.budgets);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const budget = db.budgets.find((b: any) => b.id === id);

  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  res.json(budget);
});

router.post('/', (req, res) => {
  const { category, maximum, theme } = req.body;

  if (!category || maximum == null || !theme) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBudget = {
    category,
    maximum,
    theme,
    id: uuidv4(),
  };

  db.budgets.push(newBudget);
  res.status(201).json(newBudget);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const budgetIndex = db.budgets.findIndex((b: any) => b.id === id);

  if (budgetIndex === -1) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  db.budgets.splice(budgetIndex, 1);
  res.status(204).send();
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category, maximum, theme } = req.body;

  const budget = db.budgets.find((b: any) => b.id === id);
  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }

  if (category !== undefined) budget.category = category;
  if (maximum !== undefined) budget.maximum = maximum;
  if (theme !== undefined) budget.theme = theme;

  res.json(budget);
});

export default router;
