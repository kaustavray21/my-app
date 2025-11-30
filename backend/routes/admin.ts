import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { authenticateAdmin } from '../middleware/admin';
import { User } from '../models/User';

const router = express.Router();

router.get('/users', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/users/:id', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;