import User from '../../models/userModel.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js';

export const registerUser = async (req, res) => {
    try {
        const { 
            userName, fullName, email, password, 
            phone, gender, dob, city, address, 
        } = req.body;

        // Validation for required fields
        const requiredFields = [
            'userName', 'fullName', 'email', 'password', 
            'phone', 'gender', 'dob', 'city', 'address'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Field ${field} is required` });
            }
        }

        const userExists = await User.findOne({ $or: [{ email }, { userName }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            userName, fullName, email, password,
            phone, gender, dob, city, address
        });

        if (user) {
            generateTokenAndSetCookie(res, user._id);

            // Returning ALL fields in the response
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dob: user.dob,
                city: user.city,
                address: user.address,
                role: user.role,
                message: "Registration successful"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};