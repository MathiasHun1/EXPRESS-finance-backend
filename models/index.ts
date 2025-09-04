export interface newPotModel {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface PotModel extends newPotModel {
  id: string;
}

export interface newTransactionModel {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface TransactionModel extends newTransactionModel {
  id: string;
}

export interface newBudgetModel {
  category: string;
  maximum: number;
  theme: string;
}

export interface BudgetModel extends newBudgetModel {
  id: string;
}

export interface newBalanceModel {
  current: number;
  income: number;
  expenses: number;
}

export interface BalanceModel extends newBalanceModel {
  id: string;
}
