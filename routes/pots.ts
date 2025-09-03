import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.pots);
});

router.get('/:id', (req, res) => {
  const pot = db.pots.find((p: any) => p.id === req.params.id);
  if (!pot) {
    return res.status(404).json({ error: 'Pot not found' });
  }
  res.json(pot);
});

router.post('/', (req, res) => {
  const { name, target, theme } = req.body;
  if (!name || target == null || !theme) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newPot = { id: uuidv4(), name, target, total: 0, theme };
  db.pots.push(newPot);
  res.status(201).json(newPot);
});

router.put('/:id', (req, res) => {
  const pot = db.pots.find((p: any) => p.id === req.params.id);
  if (!pot) {
    return res.status(404).json({ error: 'Pot not found' });
  }
  const { name, target, theme, total } = req.body;
  if (name !== undefined) pot.name = name;
  if (target !== undefined) pot.target = target;
  if (theme !== undefined) pot.theme = theme;
  if (total !== undefined) pot.total = total;

  res.json(pot);
});

router.delete('/:id', (req, res) => {
  const potIndex = db.pots.findIndex((p: any) => p.id === req.params.id);
  if (potIndex === -1) {
    return res.status(404).json({ error: 'Pot not found' });
  }
  db.pots.splice(potIndex, 1);
  res.status(204).send();
});

export default router;
