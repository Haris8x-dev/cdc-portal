import Education from '../../models/studentPortal/education.js';

/**
 * @desc    Save or Update Education History
 * @route   POST /api/student-portal/education
 * @access  Private
 */
export const saveEducation = async (req, res) => {
    try {
        const { educationList } = req.body;

        // 1. Validation: Ensure educationList is an array and not empty
        if (!educationList || !Array.isArray(educationList) || educationList.length === 0) {
            return res.status(400).json({ message: "Education list is required and must be an array" });
        }

        // 2. Validate individual fields within each entry
        for (const entry of educationList) {
            if (!entry.degreeProgram || !entry.institution || !entry.yearOfCompletion || !entry.cgpa) {
                return res.status(400).json({ 
                    message: "Each education entry must have degreeProgram, institution, yearOfCompletion, and cgpa" 
                });
            }
        }

        // 3. Save the data
        // Note: Currently standalone. If linking to a user later, you'd check for an existing ID here.
        const newEducation = await Education.create({ educationList });

        res.status(201).json({
            message: "Education history saved successfully",
            data: newEducation
        });

    } catch (error) {
        console.error("Education Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving education" });
    }
};

/**
 * @desc    Get Education History by ID
 * @route   GET /api/student-portal/education/:id
 * @access  Private
 */
export const getEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        
        if (!education) {
            return res.status(404).json({ message: "Education history not found" });
        }

        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};