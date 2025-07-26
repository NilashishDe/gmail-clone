import Label from "../models/label.model.js";

// @desc    Create a new label
// @route   POST /api/v1/label
export const createLabel = async (req, res) => {
    try {
        const { name, color } = req.body;
        const userId = req.id; // from isAuthenticated middleware

        if (!name) {
            return res.status(400).json({ message: "Label name is required." });
        }

        const existingLabel = await Label.findOne({ userId, name });
        if (existingLabel) {
            return res.status(409).json({ message: "Label with this name already exists." });
        }

        const newLabel = await Label.create({
            userId,
            name,
            color
        });

        return res.status(201).json({
            message: "Label created successfully.",
            label: newLabel
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while creating label." });
    }
};

// @desc    Get all labels for a user
// @route   GET /api/v1/label
export const getLabels = async (req, res) => {
    try {
        const userId = req.id;
        const labels = await Label.find({ userId }).sort({ name: 1 });
        return res.status(200).json(labels);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while fetching labels." });
    }
};

// @desc    Delete a label
// @route   DELETE /api/v1/label/:id
export const deleteLabel = async (req, res) => {
    try {
        const labelId = req.params.id;
        const userId = req.id;

        const label = await Label.findOne({ _id: labelId, userId });

        if (!label) {
            return res.status(404).json({ message: "Label not found." });
        }

        // You might also want to handle removing this label from any emails that have it.
        // For now, we'll just delete the label itself.

        await Label.findByIdAndDelete(labelId);

        return res.status(200).json({ message: "Label deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while deleting label." });
    }
};
