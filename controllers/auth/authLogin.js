import User from '../../models/userModel.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js';

/**
 * @desc    Authenticate user & get full profile
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // 2. Find user by email
        // We select('+password') to compare, but Mongoose will include all other fields by default
        const user = await User.findOne({ email }).select('+password');

        // 3. Check if user exists and password matches
        if (user && (await user.matchPassword(password))) {
            
            // 4. Generate token and set cookie
            generateTokenAndSetCookie(res, user._id);

            // 5. Success Response with ALL profile fields
            res.status(200).json({
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dob: user.dob,
                city: user.city,
                address: user.address,
                linkedIn: user.linkedIn,
                portfolio: user.portfolio,
                bio: user.bio,
                role: user.role,
                message: "Login successful"
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error during login" });
    }
};