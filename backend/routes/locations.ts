import express from 'express';
import { Location } from '../models/Location';

const router = express.Router();

// GET: Fetch all locations (Districts and their Cities)
router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find().sort({ district: 1 }); // Sorted alphabetically
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
});

// POST: Seed the database
// EXPECTS: An array of location objects in the request body
router.post('/locations/seed', async (req: any, res: any) => {
    try {
        const locationData = req.body;

        if (!Array.isArray(locationData) || locationData.length === 0) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of locations.' });
        }

        // Clear existing locations to avoid duplicates
        await Location.deleteMany({});

        // Insert the data from the request body
        await Location.insertMany(locationData);

        res.json({ message: 'Locations seeded successfully', count: locationData.length });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding locations', error });
    }
});

export default router;