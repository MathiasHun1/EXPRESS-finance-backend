import type { PotModel, TransactionModel } from '../types/index.js';
export declare const calculateBalance: (transactions: TransactionModel[], pots: PotModel[]) => {
    income: number;
    expenses: number;
    current: number;
};
export declare const transFormExampleTransactions: (transactions: TransactionModel[]) => TransactionModel[];
export declare const sendVerification: (email: string, token?: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map