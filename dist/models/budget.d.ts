import mongoose from 'mongoose';
declare const Budget: mongoose.Model<{
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
}, {}, mongoose.DefaultSchemaOptions> & {
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    theme: string;
    category: string;
    maximum: number;
    userId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Budget;
//# sourceMappingURL=budget.d.ts.map