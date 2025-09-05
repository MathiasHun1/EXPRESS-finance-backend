import { Router, type Request, type Response } from 'express';
import { db } from '../db.js';
import { newPotParser, updatedPotParser } from '../middlewares/index.js';
import type { PotModel } from '../types/index.js';
import Pot from '../models/pot.js';

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

router.post('/', newPotParser, async (req: Request<unknown, unknown, PotModel>, res: Response<PotModel>) => {
  const newPot = new Pot({ ...req.body, total: 0 });
  await newPot.save();

  res.status(201).send(newPot);
});

router.put('/:id', updatedPotParser, async (req: Request<{ id: string }, unknown, PotModel>, res: any) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedPot = await Pot.findByIdAndUpdate(id, updatedData);

  res.status(201).send(updatedPot);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Pot.findByIdAndDelete(id);

  res.status(204).send();
});

export default router;
