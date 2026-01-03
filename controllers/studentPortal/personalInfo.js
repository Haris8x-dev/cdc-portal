import PersonalInfo from '../../models/studentPortal/personalInfo.js';
import User from '../../models/userModel.js';

/**
 * @desc    Create or Update Personal Information based on User ID
 * @route   POST /api/student-portal/personal-info
 * @access  Private
 */
export const savePersonalInfo = async (req, res) => {
    try {
        const { userId } = req.body;

        // 1. Force MongoDB to drop old indexes that are no longer in the schema
        await PersonalInfo.syncIndexes(); 

        // 2. Database User Verification
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Couldn't find user. Access denied." });
        }

        // 3. Validation
        const requiredFields = [
            'fullName', 'email', 'phone', 'gender', 'dateOfBirth', 
            'city', 'address', 'linkedinProfile', 'portfolioWebsite', 
            'professional', 'bio'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Field ${field} is required` });
            }
        }

        // 4. UPSERT Logic
        const updatedInfo = await PersonalInfo.findOneAndUpdate(
            { user: userId }, 
            { $set: req.body },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            message: "Personal information synchronized successfully",
            data: updatedInfo
        });

    } catch (error) {
        console.error("Personal Info Error:", error.message);
        
        // Specific handling for the index error if syncIndexes didn't catch it fast enough
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Database index conflict. Please try clicking save again; the system is clearing old email constraints." 
            });
        }
        
        res.status(500).json({ message: error.message || "Server error" });
    }
};

/**
 * @desc    Get Personal Information by User ID
 * @route   GET /api/student-portal/personal-info/:userId
 * @access  Private
 */
export const getPersonalInfo = async (req, res) => {
    try {
        // Querying by 'user' foreign key instead of email
        const info = await PersonalInfo.findOne({ user: req.params.userId });
        
        if (!info) {
            return res.status(404).json({ message: "Personal information not found for this user" });
        }

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};