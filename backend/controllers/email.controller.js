import Email from "../models/email.model.js"; // Corrected import
import User from "../models/user.model.js";   // Corrected import

export const createEmail = async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        if (!to || !subject || !message) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const toUser = await User.findOne({ email: to });

        const email = await Email.create({
            to,
            subject,
            message,
            userId: req.id,
            recipientId: toUser ? toUser._id : null
        });

        return res.status(201).json({
            message: "Email sent successfully.",
            success: true,
            email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        if (!emailId) return res.status(400).json({ message: "Email Id is required." });

        const email = await Email.findById(emailId);
        if (!email) return res.status(404).json({ message: "Email not found." });

        if (email.userId.toString() !== req.id.toString() && (!email.recipientId || email.recipientId.toString() !== req.id.toString())) {
            return res.status(403).json({ message: "You are not authorized to delete this email." });
        }

        await Email.findByIdAndDelete(emailId);

        return res.status(200).json({
            message: "Email deleted successfully."
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllEmailsById = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ recipientId: userId }).sort({ createdAt: -1 });
        return res.status(200).json(emails);
    } catch (error) {
        console.log(error);
    }
}

export const getSentEmails = async (req, res) => {
    try {
        const userId = req.id;
        const sentEmails = await Email.find({ userId: userId }).sort({ createdAt: -1 });
        return res.status(200).json(sentEmails);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
