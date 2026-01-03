import Experience from '../../models/studentPortal/experience.js';

/**
 * @desc    Save or Update Experience History
 * @route   POST /api/student-portal/experience
 * @access  Private
 */
export const saveExperience = async (req, res) => {
    try {
        const { experienceList } = req.body;

        // 1. Validation: Ensure experienceList is an array and not empty
        if (!experienceList || !Array.isArray(experienceList) || experienceList.length === 0) {
            return res.status(400).json({ message: "Experience list is required and must be an array" });
        }

        // 2. Validate individual fields within each entry
        for (const entry of experienceList) {
            if (!entry.jobTitle || !entry.company || !entry.duration || !entry.description) {
                return res.status(400).json({ 
                    message: "Each experience entry must have jobTitle, company, duration, and description" 
                });
            }
        }

        // 3. Save the data
        const newExperience = await Experience.create({ experienceList });

        res.status(201).json({
            message: "Experience history saved successfully",
            data: newExperience
        });

    } catch (error) {
        console.error("Experience Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving experience" });
    }
};

/**
 * @desc    Get Experience History by ID
 * @route   GET /api/student-portal/experience/:id
 * @access  Private
 */
export const getExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        
        if (!experience) {
            return res.status(404).json({ message: "Experience history not found" });
        }

        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};