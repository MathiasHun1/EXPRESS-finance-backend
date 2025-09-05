import type { PotModel, TransactionModel } from '../types/index.js';

export const calculateBalance = (transactions: TransactionModel[], pots: PotModel[]) => {
  const income = transactions.reduce((total: number, transaction: any) => {
    return total + (transaction.amount > 0 ? transaction.amount : 0);
  }, 0);

  const expenses =
    transactions.reduce((total: number, transaction: any) => {
      return total + (transaction.amount <= 0 ? transaction.amount : 0);
    }, 0) * -1;

  const moneyInPots = pots.reduce((total: number, pot: any) => {
    return total + pot.total;
  }, 0);

  return {
    income,
    expenses,
    current: income - expenses - moneyInPots,
  };
};
