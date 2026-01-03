import Skills from '../../models/studentPortal/skills.js';

/**
 * @desc    Save or Update Skills List
 * @route   POST /api/student-portal/skills
 * @access  Private
 */
export const saveSkills = async (req, res) => {
    try {
        const { skillList } = req.body;

        // 1. Validation: Ensure skillList is an array and not empty
        if (!skillList || !Array.isArray(skillList) || skillList.length === 0) {
            return res.status(400).json({ message: "Skill list is required and must be an array of strings" });
        }

        // 2. Save the data
        const newSkills = await Skills.create({ skillList });

        res.status(201).json({
            message: "Skills saved successfully",
            data: newSkills
        });

    } catch (error) {
        console.error("Skills Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving skills" });
    }
};

/**
 * @desc    Get Skills List by ID
 * @route   GET /api/student-portal/skills/:id
 * @access  Private
 */
export const getSkills = async (req, res) => {
    try {
        const skills = await Skills.findById(req.params.id);
        
        if (!skills) {
            return res.status(404).json({ message: "Skills not found" });
        }

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};