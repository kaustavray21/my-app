import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: String, required: true },
    category: { type: String, required: true }
});

export const Destination = mongoose.model('Destination', DestinationSchema);