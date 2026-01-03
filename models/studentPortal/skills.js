import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    // This array will store multiple skill names as strings
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures one user only has one education document
    },
    skillList: [{
        type: String,
        required: [true, "Skill name cannot be empty"],
        trim: true
    }]
}, {
    timestamps: true
});

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;