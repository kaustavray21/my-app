import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true }, // For guides, this will be their email
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // For guides, this will be hashed mobile no
    role: { type: String, enum: ['user', 'admin', 'guide'], default: 'user' },

    // Guide Specific Fields (Optional for normal users)
    name: { type: String },
    mobile: { type: String },
    dob: { type: Date },
    aadhaar: { type: String },
    pan: { type: String },
    address: { type: String },
    district: { type: String },
    city: { type: String },
    isVerified: { type: Boolean, default: false } // Only relevant for guides
});

export const User = mongoose.model('User', UserSchema);