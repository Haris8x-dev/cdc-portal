import mongoose from 'mongoose';

const studentPortalSchema = new mongoose.Schema({
    // Link to the User account (Registration/Login data)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User reference is required"]
    },
    // Reference to Personal Info (One-to-One)
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo',
        required: [true, "Personal Information reference is required"]
    },
    // Reference to Education history (One-to-One document containing a list)
    education: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
        required: [true, "Education record reference is required"]
    },
    // Reference to Experience history
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: [true, "Experience record reference is required"]
    },
    // Reference to Skills list
    skills: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills',
        required: [true, "Skills record reference is required"]
    },
    // Reference to Projects list
    projects: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: [true, "Projects record reference is required"]
    }
}, {
    timestamps: true
});

const StudentPortal = mongoose.model('StudentPortal', studentPortalSchema);

export default StudentPortal;