import express from 'express';
import cors from 'cors';
import transactionsRouter from './routes/transactions.js';
import budgetsRouter from './routes/budgets.js';
import potsRouter from './routes/pots.js';
import balanceRouter from './routes/balance.js';
import { errorHandler, requestLogger } from './middlewares/index.js';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
// See if the server is running
app.get('/ping', (req, res) => {
    res.send('pOng');
});
app.use('/transactions', transactionsRouter);
app.use('/budgets', budgetsRouter);
app.use('/pots', potsRouter);
app.use('/balance', balanceRouter);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map