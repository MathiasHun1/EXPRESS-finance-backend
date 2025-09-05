import type { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import * as z from 'zod';
import type { TransactionModel } from '../types/index.js';

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
    budgetSchema.parse(req.body);
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
    const parsed: Omit<TransactionModel, 'date'> = transactionSchema.parse(req.body);
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

  return res.status(500).send(err.message);
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('METHOD: ', req.method);

  if (req.body) {
    console.log('BODY: ', req.body);
  }

  next();
};
