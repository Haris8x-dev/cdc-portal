import mongoose from 'mongoose';

const projectEntrySchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Project name is required"],
        trim: true
    },
    technologiesUsed: {
        type: String, // You can also use [String] if you prefer an array of tags
        required: [true, "Technologies used are required"],
        trim: true
    },
    projectLink: {
        type: String,
        required: [true, "Project link is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
        trim: true
    }
});

const projectsSchema = new mongoose.Schema({
    // This array allows the user to add multiple projects
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures one user only has one education document
    },
    projectList: [projectEntrySchema]
}, {
    timestamps: true
});

const Projects = mongoose.model('Projects', projectsSchema);

export default Projects;