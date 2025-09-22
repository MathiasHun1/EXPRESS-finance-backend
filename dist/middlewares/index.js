import { Error as MongooseError } from 'mongoose';
import * as z from 'zod';
import jwt from 'jsonwebtoken';
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
        const parsed = budgetSchema.parse(req.body);
        req.body = parsed;
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
export const newUserParser = (req, res, next) => {
    const userSchema = z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
    });
    try {
        const parsed = userSchema.parse(req.body);
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
    return res.status(500).json({ error: err });
};
export const requestLogger = (req, res, next) => {
    console.log('METHOD: ', req.method);
    console.log('Headers:', req.headers);
    if (req.body) {
        console.log('BODY: ', req.body);
    }
    next();
};
export const userExtractor = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=index.js.map