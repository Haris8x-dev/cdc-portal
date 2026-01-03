import Projects from '../../models/studentPortal/projects.js';
import User from '../../models/userModel.js';

/**
 * @desc    Save or Update Projects List (Sync/Replace Logic)
 * @route   POST /api/student-portal/projects
 * @access  Private
 */
export const saveProjects = async (req, res) => {
    try {
        const { userId, projectList } = req.body;

        // 1. Basic ID Validation
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // 2. Database User Verification
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Couldn't find user. Access denied." });
        }

        // 3. Validation: Ensure projectList is an array
        // We allow an empty array [] in case the user deletes all projects
        if (!projectList || !Array.isArray(projectList)) {
            return res.status(400).json({ message: "Project list must be an array" });
        }

        // 4. Validate individual project fields for non-empty entries
        for (const project of projectList) {
            if (!project.projectName || !project.technologiesUsed || !project.projectLink || !project.description) {
                return res.status(400).json({ 
                    message: "Each project entry must have a name, technologies, link, and description" 
                });
            }
        }

        // 5. Sync Logic (Upsert)
        // Find by user foreign key and replace the projectList array entirely
        const updatedProjects = await Projects.findOneAndUpdate(
            { user: userId },
            { projectList },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            message: "Projects synchronized successfully",
            data: updatedProjects
        });

    } catch (error) {
        console.error("Projects Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving projects" });
    }
};

/**
 * @desc    Get Projects by User ID
 * @route   GET /api/student-portal/projects/:userId
 * @access  Private
 */
export const getProjects = async (req, res) => {
    try {
        // Query by the 'user' field (Foreign Key)
        const projects = await Projects.findOne({ user: req.params.userId });
        
        if (!projects) {
            return res.status(404).json({ message: "No projects found for this user" });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};