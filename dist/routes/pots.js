import { Router } from 'express';
import { newPotParser, updatedPotParser } from '../middlewares/index.js';
import Pot from '../models/pot.js';
import Transaction from '../models/transaction.js';
import { calculateBalance } from '../utils/index.js';
import User from '../models/user.js';
const router = Router();
// --------- Get All
router.get('/', async (req, res) => {
    const userFromToken = req.user;
    const pots = await Pot.find({ userId: userFromToken.userId });
    res.send(pots);
});
// --------- Get one
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const userFromToken = req.user;
    const pot = await Pot.findById(id);
    if (!pot) {
        return res.status(404).json({ error: 'Pot not found' });
    }
    if (pot.userId.toString() !== userFromToken.userId) {
        return res.status(403).json({ error: 'unauthorized' });
    }
    res.json(pot);
});
// --------- Create new
router.post('/', newPotParser, async (req, res) => {
    const userFromToken = req.user;
    const newPotData = { ...req.body, total: 0, userId: userFromToken.userId };
    const newPot = new Pot(newPotData);
    const savedPot = await newPot.save();
    const owner = await User.findById(userFromToken.userId);
    if (!owner) {
        return res.status(500).json({ error: 'Unexpected error finding user' });
    }
    owner.pots.push(savedPot.id);
    await owner.save();
    res.status(201).send(newPot);
});
// ---------- Update one
router.put('/:id', updatedPotParser, async (req, res) => {
    const id = req.params.id;
    const userFromToken = req.user;
    const oldData = await Pot.findById(id);
    if (!oldData) {
        return res.status(404).json({ error: 'Pot not found' });
    }
    if (oldData.userId.toString() !== userFromToken.userId) {
        return res.status(403).json({ error: 'unauthorized' });
    }
    const updatedData = req.body;
    const transactions = await Transaction.find({ userId: userFromToken.userId });
    const pots = await Pot.find({ userId: userFromToken.userId });
    const balance = calculateBalance(transactions, pots);
    /* check if user have enough balance for the operation */
    let amount = 0;
    if (oldData && updatedData) {
        amount = updatedData.total - oldData.total;
    }
    if (balance.current - amount < 0) {
        return res.status(400).json({ error: 'Insufficient funds!' });
    }
    const updatedPot = await Pot.findByIdAndUpdate(id, updatedData, { returnDocument: 'after' });
    res.status(201).send(updatedPot);
});
// -------- Delete one
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const userFromToken = req.user;
    const pot = await Pot.findById(id);
    if (!pot) {
        return res.status(404).json({ error: 'Not found' });
    }
    if (pot.userId.toString() !== userFromToken.userId) {
        return res.status(403).json({ error: 'unauthorized' });
    }
    await Pot.findByIdAndDelete(id);
    res.status(204).send();
});
export default router;
//# sourceMappingURL=pots.js.map