import express from 'express';
import { Destination } from '../models/Destination';

const router = express.Router();

// Get all destinations
router.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destinations' });
    }
});

// SEED ROUTE (Updated to use req.body)
router.post('/destinations/seed', async (req: any, res: any) => {
    try {
        // Clear existing data to avoid duplicates
        await Destination.deleteMany({});

        // Insert data sent from Postman
        await Destination.insertMany(req.body);

        res.json({ message: 'Destinations seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding data', error });
    }
});

export default router;