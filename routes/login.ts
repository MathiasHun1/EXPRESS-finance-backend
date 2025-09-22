import User from '../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username!' });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid password!' });
  }

  if (!user.isVerified) {
    return res.status(401).json({ error: 'Account not verified yet!' });
  }

  const userForToken = {
    username,
    userId: user._id,
  };
  const token = jwt.sign(userForToken, process.env.JWT_KEY as string);

  res.send({ token, username });
});

export default router;
