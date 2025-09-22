import type { PotInput, TransactionInput, BudgetInput } from '../types/index.js';
interface PlainUser {
    username: string;
    password: string;
    email: string;
}
declare const _default: {
    clearDb: () => Promise<void>;
    loadTestData: () => Promise<void>;
    creataDataForUser: (user: PlainUser, transactions: TransactionInput[], budgets: BudgetInput[], pots: PotInput[]) => Promise<void>;
    transactions_1: {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[];
    users: {
        username: string;
        password: string;
        email: string;
    }[];
};
export default _default;
//# sourceMappingURL=db_helper.d.ts.map