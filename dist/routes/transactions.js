import { Router } from 'express';
import { transactionsParser } from '../middlewares/index.js';
import Transaction from '../models/transaction.js';
const router = Router();
router.get('/', async (req, res) => {
    const transactions = await Transaction.find({});
    res.send(transactions);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    res.send(transaction);
});
router.post('/', transactionsParser, async (req, res) => {
    const newtransObject = {
        ...req.body,
        date: new Date(),
    };
    const newTransaction = new Transaction(newtransObject);
    const result = await newTransaction.save();
    res.status(201).send(result);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Transaction.findByIdAndDelete(id);
    res.send();
});
export default router;
//# sourceMappingURL=transactions.js.map