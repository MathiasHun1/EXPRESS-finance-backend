import express from 'express';
import cors from 'cors';
import { errorHandler, requestLogger, userExtractor } from './middlewares/index.js';
import mongoose from 'mongoose';
import config from './utils/config.js';
import transactionsRouter from './routes/transactions.js';
import budgetsRouter from './routes/budgets.js';
import potsRouter from './routes/pots.js';
import usersRouter from './routes/users.js';
import balanceRouter from './routes/balance.js';
import loginRouter from './routes/login.js';
import verifyRouter from './routes/verify_email.js';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

console.log('NODE_ENV: ', process.env.NODE_ENV);

try {
  console.log('Connecting to database..');
  await mongoose.connect(config.MONGODB_URI!);
  console.log('Connected to database!');
} catch (error) {
  console.log('Error connecting Database!');
}

if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

app.use('/login', loginRouter);
app.use('/verify-email', verifyRouter);
app.use('/users', usersRouter);
app.use('/transactions', userExtractor, transactionsRouter);
app.use('/budgets', userExtractor, budgetsRouter);
app.use('/pots', userExtractor, potsRouter);
app.use('/balance', userExtractor, balanceRouter);
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, async () => {
  console.log('Server is running on PORT: ', PORT);
});

export default app;
