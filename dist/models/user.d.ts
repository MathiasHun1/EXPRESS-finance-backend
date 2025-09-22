import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
}, {}, mongoose.DefaultSchemaOptions> & {
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    email: string;
    username: string;
    passwordHash: string;
    transactions: mongoose.Types.ObjectId[];
    budgets: mongoose.Types.ObjectId[];
    pots: mongoose.Types.ObjectId[];
    isVerified: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=user.d.ts.map