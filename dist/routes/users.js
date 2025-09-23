import { Router } from 'express';
import User from '../models/user.js';
import { newUserParser, userExtractor } from '../middlewares/index.js';
import bcrypt from 'bcrypt';
import { sendVerification } from '../utils/index.js';
import jwt from 'jsonwebtoken';
const router = Router();
router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).populate('transactions').populate('budgets').populate('pots');
    res.send(user);
});
router.delete('/', userExtractor, async (req, res) => {
    const { username, userId } = req.user;
    console.log('REQUEST:USER: ', username, userId);
    if (username === 'ExampleUser') {
        return res.status(403).send('Example user cannot be deleted');
    }
    await User.findByIdAndDelete(userId);
    res.status(204).send();
});
router.delete('/:id', async (req, res) => {
    console.log('ID: ', req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
router.post('/', newUserParser, async (req, res) => {
    const { username, password, email } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
        return res.status(409).json({ error: 'username already exists!' });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(409).json({ error: 'email already registered!' });
    }
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'invalid email format' });
    }
    // Password validation --- //
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passRegex.test(password)) {
        return res.status(400).json({ error: 'invalid password format' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const isVerified = username === 'ExampleUser' ? true : false;
    // Create a new user with verification set to false (except for example user)
    const newUser = new User({
        username,
        passwordHash,
        email: email,
        pots: [],
        transactions: [],
        budgets: [],
        isVerified: isVerified,
    });
    const createdUser = await newUser.save();
    // Create verification jwt token and send it by email
    const userForToken = {
        userId: createdUser._id,
        email: createdUser.email,
    };
    const emailToken = jwt.sign(userForToken, process.env.JWT_EMAIL_KEY, { expiresIn: '1d' });
    await sendVerification(email, emailToken);
    // res.status(201).send(createdUser);
    res.status(200).json({ message: 'Success' });
});
export default router;
//# sourceMappingURL=users.js.map