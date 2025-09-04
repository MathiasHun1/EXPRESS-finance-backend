import type { NextFunction, Request, Response } from 'express';
import type { newPotModel, PotModel } from '../models/index.js';
import * as z from 'zod';
import { ZodError } from 'zod/v3';

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
    name: z.string(),
    category: z.string(),
    amount: z.number(),
    recurring: z.boolean(),
  });

  try {
    transactionSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).send(err.issues);
  }
  console.log('runs');

  return res.status(500).send(err.message);
};
