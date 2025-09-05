export interface PotModel {
  name: string;
  target: number;
  total: number;
  theme: string;
  id: string;
}

export interface TransactionModel {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
}

export interface BudgetModel {
  category: string;
  maximum: number;
  theme: string;
}

export interface BalanceModel {
  current: number;
  income: number;
  expenses: number;
}
