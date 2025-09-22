import mongoose from 'mongoose';
declare const Pot: mongoose.Model<{
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    target: number;
    theme: string;
    total: number;
    userId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Pot;
//# sourceMappingURL=pot.d.ts.map