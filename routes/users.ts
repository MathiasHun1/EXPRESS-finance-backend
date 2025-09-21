import { Router } from 'express';
import User from '../models/user.js';
import type { Request, Response } from 'express';
import { newUserParser } from '../middlewares/index.js';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).populate('transactions').populate('budgets').populate('pots');
  res.send(user);
});

router.post('/', newUserParser, async (req: Request<unknown, unknown, { username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;

  const userExist = await User.findOne({ username });
  console.log(userExist);

  if (userExist) {
    return res.status(409).json({ error: 'username already exists!' });
  }

  // --- TODO: Add email field to user --- //

  // Password validation --- //
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!regex.test(password)) {
    return res.status(400).json({ error: 'invalid password format' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    passwordHash,
    pots: [],
    transactions: [],
    budgets: [],
  });

  const createdUser = await newUser.save();

  res.status(201).send(createdUser);
});

export default router;
