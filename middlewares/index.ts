import type { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import * as z from 'zod';
import jwt from 'jsonwebtoken';

export const newPotParser = (req: Request, res: Response, next: NextFunction) => {
  const potSchema = z.object({
    name: z.string(),
    target: z.number().min(0),
    theme: z.string(),
  });

  try {
    potSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const updatedPotParser = (req: Request, res: Response, next: NextFunction) => {
  const potSchema = z.object({
    name: z.string(),
    target: z.number().min(0),
    theme: z.string(),
    total: z.number(),
  });

  try {
    potSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const budgetParser = (req: Request, res: Response, next: NextFunction) => {
  const budgetSchema = z.object({
    category: z.string(),
    maximum: z.number().min(0),
    theme: z.string(),
  });

  try {
    const parsed = budgetSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    next(error);
  }
};

export const transactionsParser = (req: Request, res: Response, next: NextFunction) => {
  const transactionSchema = z.object({
    avatar: z.string(),
    name: z.string(),
    category: z.string(),
    amount: z.number(),
    recurring: z.boolean(),
  });

  try {
    const parsed = transactionSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    next(error);
  }
};

export const newUserParser = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
  });

  try {
    const parsed = userSchema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).send(err.issues);
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).send(err.message);
  }

  return res.status(500).json({ error: err });
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('METHOD: ', req.method);
  console.log('Headers:', req.headers);

  if (req.body) {
    console.log('BODY: ', req.body);
  }

  next();
};

export const userExtractor = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_KEY as string);
    req.user = user as { username: string; userId: string };
    next();
  } catch (error) {
    next(error);
  }
};
