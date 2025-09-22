import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ error: 'verify-token missing' });
  }

  const { userId, email } = jwt.verify(token, process.env.JWT_EMAIL_KEY as string) as { userId: string; email: string };
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  user.isVerified = true;
  await user.save();

  const forntendUrl = process.env.NODE_ENV === 'development' ? process.env.FRONTEND_URL_DEVELOPMENT : process.env.FRONTEND_URL_PRODUCTION;

  if (!forntendUrl) {
    console.error('frontend url invalid or undefined: ', forntendUrl);
    return res.status(500);
  }

  res.redirect(forntendUrl!);
});

export default router;
