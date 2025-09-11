import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getTestToken = (username: string, userId: string) => {
  const payload = { username, userId };
  const token = jwt.sign(payload, process.env.JWT_KEY as string);
  return token;
};
