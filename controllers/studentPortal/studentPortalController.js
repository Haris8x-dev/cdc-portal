import StudentPortal from '../../models/studentPortal/studentPortal.js';
import User from '../../models/userModel.js';

/**
 * @desc    Get Full Student Profile (All sections combined)
 * @route   GET /api/student-portal/profile/:userId
 */
export const getFullStudentProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Populate everything linked to this user
        const profile = await StudentPortal.findOne({ user: userId })
            .populate('user', 'name email')
            .populate('personalInfo')
            .populate('education')
            .populate('experience')
            .populate('skills')
            .populate('projects');

        if (!profile) {
            return res.status(404).json({ message: "Student portal profile not found." });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching complete profile" });
    }
};

/**
 * @desc    Initialize or Update Portal Links
 * @route   POST /api/student-portal/initialize
 */
export const initializeStudentPortal = async (req, res) => {
    try {
        const { userId, personalInfo, education, experience, skills, projects } = req.body;

        // Verify User
        const userExists = await User.findById(userId);
        if (!userExists) return res.status(404).json({ message: "User not found" });

        // Upsert the Master Portal document
        const portal = await StudentPortal.findOneAndUpdate(
            { user: userId },
            { 
                personalInfo, 
                education, 
                experience, 
                skills, 
                projects 
            },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: "Student Portal links synchronized successfully",
            data: portal
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};