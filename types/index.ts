import type { Types } from 'mongoose';

export interface PotModel {
  name: string;
  target: number;
  total: number;
  theme: string;
  userId: Types.ObjectId | string;
}

export interface TransactionModel {
  avatar: string;
  name: string;
  category: string;
  date: Date | string;
  amount: number;
  recurring: boolean;
  userId: Types.ObjectId | string;
}

export interface BudgetModel {
  category: string;
  maximum: number;
  theme: string;
  userId: string;
}

export interface BalanceModel {
  current: number;
  income: number;
  expenses: number;
}

export interface UserModel {
  username: string;
  passwordHash: string;
  transactions: string[];
  budgets: string[];
  pots: string[];
}

export type PotInput = Omit<PotModel, 'userId'>;
export type TransactionInput = Omit<TransactionModel, 'userId'>;
export type BudgetInput = Omit<BudgetModel, 'userId'>;
