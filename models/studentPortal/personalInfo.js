import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ['male', 'female', 'other'] // Optional: restricts input to these values
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    linkedinProfile: {
        type: String,
        required: [true, "LinkedIn profile link is required"],
        trim: true
    },
    portfolioWebsite: {
        type: String,
        required: [true, "Portfolio website link is required"],
        trim: true
    },
    professional: {
        type: String,
        required: [true, "Professional title/headline is required"],
        trim: true
    },
    bio: {
        type: String,
        required: [true, "Bio is required"],
        trim: true
    }
}, {
    timestamps: true
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;