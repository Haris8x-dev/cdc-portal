import mongoose from 'mongoose';

const experienceEntrySchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, "Job title is required"],
        trim: true
    },
    company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true
    },
    duration: {
        type: String,
        required: [true, "Duration is required (e.g., Jan 2020 - Present)"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    }
});

const experienceSchema = new mongoose.Schema({
    // This allows for the "Add another Experience" functionality
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures one user only has one education document
    },
    experienceList: [experienceEntrySchema]
}, {
    timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;