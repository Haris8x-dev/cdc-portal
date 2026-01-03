import StudentPortal from '../../models/studentPortal/studentPortal.js';

/**
 * @desc    Get Full Student Profile (All sections combined)
 * @route   GET /api/student-portal/profile/:userId
 * @access  Private
 */
export const getFullStudentProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch the portal document and chain .populate() for every reference
        const profile = await StudentPortal.findOne({ user: userId })
            .populate('user', 'name email') // Only get name/email from User model
            .populate('personalInfo')
            .populate('education')
            .populate('experience')
            .populate('skills')
            .populate('projects');

        if (!profile) {
            return res.status(404).json({ 
                message: "Student portal profile not found for this user." 
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error("Portal Fetch Error:", error.message);
        res.status(500).json({ message: "Server error while fetching complete profile" });
    }
};

/**
 * @desc    Initial Setup: Link existing section IDs to a User Portal
 * @route   POST /api/student-portal/initialize
 * @access  Private
 */
export const initializeStudentPortal = async (req, res) => {
    try {
        const { user, personalInfo, education, experience, skills, projects } = req.body;

        const newPortal = await StudentPortal.create({
            user,
            personalInfo,
            education,
            experience,
            skills,
            projects
        });

        res.status(201).json({
            message: "Student Portal initialized and linked successfully",
            data: newPortal
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};