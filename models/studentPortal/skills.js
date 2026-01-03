import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    // This array will store multiple skill names as strings
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