import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    district: { type: String, required: true, unique: true },
    cities: [{ type: String, required: true }]
});

export const Location = mongoose.model('Location', LocationSchema);