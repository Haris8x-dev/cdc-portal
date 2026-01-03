import mongoose from 'mongoose';

const educationEntrySchema = new mongoose.Schema({
    degreeProgram: {
        type: String,
        required: [true, "Degree/Program is required"],
        trim: true
    },
    institution: {
        type: String,
        required: [true, "Institution is required"],
        trim: true
    },
    yearOfCompletion: {
        type: String,
        required: [true, "Year of Completion is required"],
        trim: true
    },
    cgpa: {
        type: String,
        required: [true, "CGPA is required"],
        trim: true
    }
});

const educationSchema = new mongoose.Schema({
    // This array allows the user to submit multiple education blocks at once
    educationList: [educationEntrySchema] 
}, {
    timestamps: true
});

const Education = mongoose.model('Education', educationSchema);

export default Education;