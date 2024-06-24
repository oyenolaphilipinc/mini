import mongoose from "mongoose";

const tapDetailsSchema = new mongoose.Schema({
    userId: { type: Number, unique: true, required: true, ref: 'Users' },
    tapBalance: { type: Number, default: 0 },
    tapEnergy: { type: Number, default: 750 },
    level: { type: Number, default: 1 },
    online: { type: Boolean, default: false },
}, { timestamps: true });

const TapDetails = mongoose.model('TapDetails', tapDetailsSchema);

export default TapDetails
