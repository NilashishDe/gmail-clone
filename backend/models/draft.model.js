import mongoose from "mongoose";

const draftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: String,
        default: "",
    },
    subject: {
        type: String,
        default: "",
    },
    message: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Draft = mongoose.model('Draft', draftSchema);

// Ensure this line is present and correct
export default Draft;
