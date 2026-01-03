import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false 
    },
    // --- New Profile Fields ---
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
    dob: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password Method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;