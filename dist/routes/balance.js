import { Router } from 'express';
import Transaction from '../models/transaction.js';
import Pot from '../models/pot.js';
import { calculateBalance } from '../utils/index.js';
const router = Router();
router.get('/', async (req, res) => {
    const transactions = await Transaction.find({});
    const pots = await Pot.find({});
    const balance = calculateBalance(transactions, pots);
    return res.send(balance);
});
export default router;
//# sourceMappingURL=balance.js.map