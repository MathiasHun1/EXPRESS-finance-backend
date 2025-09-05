export const calculateBalance = (transactions, pots) => {
    const income = transactions.reduce((total, transaction) => {
        return total + (transaction.amount > 0 ? transaction.amount : 0);
    }, 0);
    const expenses = transactions.reduce((total, transaction) => {
        return total + (transaction.amount <= 0 ? transaction.amount : 0);
    }, 0) * -1;
    const moneyInPots = pots.reduce((total, pot) => {
        return total + pot.total;
    }, 0);
    return {
        income,
        expenses,
        current: income - expenses - moneyInPots,
    };
};
//# sourceMappingURL=index.js.map