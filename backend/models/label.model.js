import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#E0E0E0', // A default neutral color
    },
}, { timestamps: true });

const Label = mongoose.model('Label', labelSchema);

// Ensure this line is present and correct
export default Label;
