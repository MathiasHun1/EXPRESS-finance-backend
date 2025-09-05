import { Router, type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { newPotParser, updatedPotParser } from '../utils/index.js';
import type { newPotModel, PotModel } from '../types/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.data.pots);
});

router.get('/:id', (req, res) => {
  const pot = db.data.pots.find((p) => p.id === req.params.id);
  if (!pot) {
    return res.status(404).json({ error: 'Pot not found' });
  }
  res.json(pot);
});

router.post('/', newPotParser, (req: Request<unknown, unknown, newPotModel>, res: Response<PotModel>) => {
  const newPot: PotModel = { ...req.body, total: 0, id: uuidv4() };

  db.savePot(newPot);
  res.status(201).send(newPot);
});

router.put('/:id', updatedPotParser, (req: Request<{ id: string }, unknown, PotModel>, res: any) => {
  const id = req.params.id;
  const updatedPot = req.body;
  updatedPot.id = id;

  db.updatePot(updatedPot);

  res.status(201).send(updatedPot);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!db.deletePot(id)) {
    return res.status(400).json({ error: 'Pot not found' });
  }
  res.status(204).send();
});

export default router;
