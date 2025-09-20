import type { PotModel, TransactionModel } from '../types/index.js';

export const calculateBalance = (transactions: TransactionModel[], pots: PotModel[]) => {
  const income = transactions
    ? transactions.reduce((total: number, transaction: any) => {
        return total + (transaction.amount > 0 ? transaction.amount : 0);
      }, 0)
    : 0;

  const expenses = transactions
    ? transactions.reduce((total: number, transaction: any) => {
        return total + (transaction.amount <= 0 ? transaction.amount : 0);
      }, 0) * -1
    : 0;

  const moneyInPots = pots
    ? pots.reduce((total: number, pot: any) => {
        return total + pot.total;
      }, 0)
    : 0;

  return {
    income,
    expenses,
    current: income - expenses - moneyInPots,
  };
};

export const transFormExampleTransactions = (transactions: TransactionModel[]) => {
  return transactions.map((tr) => {
    const month = new Date(tr.date).getMonth();
    const currentMonth = new Date().getMonth();

    if (month === 7) {
      const newDate = new Date(tr.date);
      newDate.setMonth(currentMonth);
      return {
        ...tr,
        date: newDate,
      };
    }
    return tr;
  });
};
