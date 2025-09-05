import { Error as MongooseError } from 'mongoose';
import * as z from 'zod';
export const newPotParser = (req, res, next) => {
    const potSchema = z.object({
        name: z.string(),
        target: z.number().min(0),
        theme: z.string(),
    });
    try {
        potSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
export const updatedPotParser = (req, res, next) => {
    const potSchema = z.object({
        name: z.string(),
        target: z.number().min(0),
        theme: z.string(),
        total: z.number(),
    });
    try {
        potSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
export const budgetParser = (req, res, next) => {
    const budgetSchema = z.object({
        category: z.string(),
        maximum: z.number().min(0),
        theme: z.string(),
    });
    try {
        budgetSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
export const transactionsParser = (req, res, next) => {
    const transactionSchema = z.object({
        avatar: z.string(),
        name: z.string(),
        category: z.string(),
        amount: z.number(),
        recurring: z.boolean(),
    });
    try {
        const parsed = transactionSchema.parse(req.body);
        req.body = parsed;
        next();
    }
    catch (error) {
        next(error);
    }
};
export const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        return res.status(400).send(err.issues);
    }
    if (err instanceof MongooseError.CastError) {
        return res.status(400).send(err.message);
    }
    return res.status(500).send(err.message);
};
export const requestLogger = (req, res, next) => {
    console.log('METHOD: ', req.method);
    if (req.body) {
        console.log('BODY: ', req.body);
    }
    next();
};
//# sourceMappingURL=index.js.map