import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { SECRET_KEY } from '../middleware/auth';

const router = express.Router();

router.post('/signup', async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
        if (error.code === 11000) {
            if (error.keyPattern?.username) {
                return res.status(400).json({ error: 'Username already taken' });
            }
            if (error.keyPattern?.email) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }
        res.status(500).json({ error: 'Error signing up' });
    }
});

router.post('/login', async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Change: Send the role back to the client
        res.json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

export default router;