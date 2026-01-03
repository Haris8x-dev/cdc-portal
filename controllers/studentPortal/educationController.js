import Education from '../../models/studentPortal/education.js';
import User from '../../models/userModel.js'; // Import your User model

/**
 * @desc    Save or Update Education History with User Verification
 * @route   POST /api/student-portal/education
 * @access  Private
 */
export const saveEducation = async (req, res) => {
    try {
        const { userId, educationList } = req.body;

        // 1. Basic ID Validation
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // 2. Database User Verification
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Couldn't find user. Access denied." });
        }

        // 3. Education List Validation
        if (!educationList || !Array.isArray(educationList) || educationList.length === 0) {
            return res.status(400).json({ message: "Education list is required and must be an array" });
        }

        for (const entry of educationList) {
            if (!entry.degreeProgram || !entry.institution || !entry.yearOfCompletion || !entry.cgpa) {
                return res.status(400).json({ 
                    message: "Each education entry must have degreeProgram, institution, yearOfCompletion, and cgpa" 
                });
            }
        }

        // 4. Synchronize Data (Upsert)
        const updatedEducation = await Education.findOneAndUpdate(
            { user: userId },
            { educationList },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            message: "Education history synchronized successfully",
            data: updatedEducation
        });

    } catch (error) {
        console.error("Education Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving education" });
    }
};

/**
 * @desc    Get Education History by User ID
 * @route   GET /api/student-portal/education/:userId
 */
export const getEducation = async (req, res) => {
    try {
        const education = await Education.findOne({ user: req.params.userId });
        
        if (!education) {
            return res.status(404).json({ message: "No education history found for this user" });
        }

        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};