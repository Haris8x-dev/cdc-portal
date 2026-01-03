import Experience from '../../models/studentPortal/experience.js';
import User from '../../models/userModel.js'; // Ensure correct path to your User model

/**
 * @desc    Save or Update Experience History (Sync/Replace Logic)
 * @route   POST /api/student-portal/experience
 * @access  Private
 */
export const saveExperience = async (req, res) => {
    try {
        const { userId, experienceList } = req.body;

        // 1. Basic ID Validation
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // 2. Database User Verification
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Couldn't find user. Access denied." });
        }

        // 3. Validation: Ensure experienceList is an array (allow empty array if user deletes all entries)
        if (!experienceList || !Array.isArray(experienceList)) {
            return res.status(400).json({ message: "Experience list must be an array" });
        }

        // 4. Validate individual fields within each entry
        for (const entry of experienceList) {
            if (!entry.jobTitle || !entry.company || !entry.duration || !entry.description) {
                return res.status(400).json({ 
                    message: "Each entry must have jobTitle, company, duration, and description" 
                });
            }
        }

        // 5. Synchronize Data (Upsert)
        // This will find the document by userId and replace the old list with the new one.
        const updatedExperience = await Experience.findOneAndUpdate(
            { user: userId },
            { experienceList },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            message: "Experience history synchronized successfully",
            data: updatedExperience
        });

    } catch (error) {
        console.error("Experience Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving experience" });
    }
};

/**
 * @desc    Get Experience History by User ID
 * @route   GET /api/student-portal/experience/:userId
 * @access  Private
 */
export const getExperience = async (req, res) => {
    try {
        // Querying by the 'user' foreign key
        const experience = await Experience.findOne({ user: req.params.userId });
        
        if (!experience) {
            return res.status(404).json({ message: "No experience history found for this user" });
        }

        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};