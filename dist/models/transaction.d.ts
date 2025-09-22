import mongoose from 'mongoose';
declare const Transaction: mongoose.Model<{
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    category: string;
    avatar: string;
    amount: number;
    recurring: boolean;
    userId: mongoose.Types.ObjectId;
    date: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Transaction;
//# sourceMappingURL=transaction.d.ts.map