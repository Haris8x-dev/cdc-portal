import Skills from '../../models/studentPortal/skills.js';
import User from '../../models/userModel.js'; // Ensure the path to your User model is correct

/**
 * @desc    Save or Update Skills List (Sync/Replace Logic)
 * @route   POST /api/student-portal/skills
 * @access  Private
 */
export const saveSkills = async (req, res) => {
    try {
        const { userId, skillList } = req.body;

        // 1. Basic ID Validation
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // 2. Database User Verification
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Couldn't find user. Access denied." });
        }

        // 3. Validation: Ensure skillList is an array and not empty
        if (!skillList || !Array.isArray(skillList) || skillList.length === 0) {
            return res.status(400).json({ message: "Skill list is required and must be an array of strings" });
        }

        // 4. Sync Logic (Upsert)
        // This finds the document by 'user' (Foreign Key) and replaces the skillList array.
        const updatedSkills = await Skills.findOneAndUpdate(
            { user: userId },
            { skillList },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            message: "Skills synchronized successfully",
            data: updatedSkills
        });

    } catch (error) {
        console.error("Skills Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving skills" });
    }
};

/**
 * @desc    Get Skills List by User ID
 * @route   GET /api/student-portal/skills/:userId
 * @access  Private
 */
export const getSkills = async (req, res) => {
    try {
        // Querying by the 'user' field (Foreign Key) instead of document _id
        const skills = await Skills.findOne({ user: req.params.userId });
        
        if (!skills) {
            return res.status(404).json({ message: "No skills found for this user" });
        }

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};