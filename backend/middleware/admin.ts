import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const authenticateAdmin = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};