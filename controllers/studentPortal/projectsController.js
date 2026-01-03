import Projects from '../../models/studentPortal/projects.js';

/**
 * @desc    Save or Update Projects List
 * @route   POST /api/student-portal/projects
 * @access  Private
 */
export const saveProjects = async (req, res) => {
    try {
        const { projectList } = req.body;

        // 1. Validation: Ensure projectList is an array and not empty
        if (!projectList || !Array.isArray(projectList) || projectList.length === 0) {
            return res.status(400).json({ message: "Project list is required and must be an array" });
        }

        // 2. Validate individual fields within each project entry
        for (const project of projectList) {
            if (!project.projectName || !project.technologiesUsed || !project.projectLink || !project.description) {
                return res.status(400).json({ 
                    message: "Each project must have a name, technologies, link, and description" 
                });
            }
        }

        // 3. Save the data
        const newProjects = await Projects.create({ projectList });

        res.status(201).json({
            message: "Projects saved successfully",
            data: newProjects
        });

    } catch (error) {
        console.error("Projects Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving projects" });
    }
};

/**
 * @desc    Get Projects List by ID
 * @route   GET /api/student-portal/projects/:id
 * @access  Private
 */
export const getProjects = async (req, res) => {
    try {
        const projects = await Projects.findById(req.params.id);
        
        if (!projects) {
            return res.status(404).json({ message: "Projects record not found" });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};