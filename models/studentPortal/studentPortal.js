import mongoose from 'mongoose';

// studentPortal.js
const studentPortalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User reference is required"],
        unique: true // Add this to ensure one master portal per user
    },
    personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' },
    education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
    skills: { type: mongoose.Schema.Types.ObjectId, ref: 'Skills' },
    projects: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }
}, { timestamps: true });

const StudentPortal = mongoose.model('StudentPortal', studentPortalSchema);

export default StudentPortal;