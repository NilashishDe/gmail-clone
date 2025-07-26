import Draft from "../models/draft.model.js";

// @desc    Save or update a draft
// @route   POST /api/v1/draft
export const saveDraft = async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        const userId = req.id; // from isAuthenticated middleware

        // For simplicity, this creates a new draft every time.
        // You could expand this to update an existing draft by passing a draft ID.
        const newDraft = await Draft.create({
            userId,
            to,
            subject,
            message
        });

        return res.status(201).json({
            message: "Draft saved successfully.",
            draft: newDraft
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while saving draft." });
    }
};

// @desc    Get all drafts for a user
// @route   GET /api/v1/draft
export const getDrafts = async (req, res) => {
    try {
        const userId = req.id;
        const drafts = await Draft.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(drafts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while fetching drafts." });
    }
};

// @desc    Delete a draft
// @route   DELETE /api/v1/draft/:id
export const deleteDraft = async (req, res) => {
    try {
        const draftId = req.params.id;
        const userId = req.id;

        const draft = await Draft.findOne({ _id: draftId, userId });

        if (!draft) {
            return res.status(404).json({ message: "Draft not found." });
        }

        await Draft.findByIdAndDelete(draftId);

        return res.status(200).json({ message: "Draft deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while deleting draft." });
    }
};
