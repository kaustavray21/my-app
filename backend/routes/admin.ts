import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { authenticateAdmin } from '../middleware/admin';
import { User } from '../models/User';

const router = express.Router();

// Existing: Get all users
router.get('/users', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Existing: Delete user (works for guides too)
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

// New Route: Get pending guides (unverified)
router.get('/guides/pending', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const guides = await User.find({ role: 'guide', isVerified: false }, '-password');
        res.json(guides);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching pending guides' });
    }
});

// New Route: Verify a guide
router.patch('/guides/:id/verify', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const guide = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        ).select('-password');

        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }

        res.json({ message: 'Guide verified successfully', guide });
    } catch (error) {
        res.status(500).json({ message: 'Server error verifying guide' });
    }
});

export default router;