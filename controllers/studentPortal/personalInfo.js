import PersonalInfo from '../../models/studentPortal/personalInfo.js';

/**
 * @desc    Create or Update Personal Information
 * @route   POST /api/student-portal/personal-info
 * @access  Private (Assuming user is logged in)
 */
export const savePersonalInfo = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            city,
            address,
            linkedinProfile,
            portfolioWebsite,
            professional,
            bio
        } = req.body;

        // 1. Validation for all required fields
        const requiredFields = [
            'fullName', 'email', 'phone', 'gender', 'dateOfBirth', 
            'city', 'address', 'linkedinProfile', 'portfolioWebsite', 
            'professional', 'bio'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Field ${field} is required` });
            }
        }

        // 2. Check if info already exists for this email to perform an update
        // (Or use user ID if you decide to link it later)
        let info = await PersonalInfo.findOne({ email });

        if (info) {
            // Update existing record
            info = await PersonalInfo.findOneAndUpdate(
                { email },
                { $set: req.body },
                { new: true, runValidators: true }
            );
            return res.status(200).json({
                message: "Personal information updated successfully",
                data: info
            });
        }

        // 3. Create new record if it doesn't exist
        const newPersonalInfo = await PersonalInfo.create({
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            city,
            address,
            linkedinProfile,
            portfolioWebsite,
            professional,
            bio
        });

        res.status(201).json({
            message: "Personal information saved successfully",
            data: newPersonalInfo
        });

    } catch (error) {
        console.error("Personal Info Error:", error.message);
        res.status(500).json({ message: error.message || "Server error while saving personal info" });
    }
};

/**
 * @desc    Get Personal Information by Email
 * @route   GET /api/student-portal/personal-info/:email
 * @access  Private
 */
export const getPersonalInfo = async (req, res) => {
    try {
        const info = await PersonalInfo.findOne({ email: req.params.email });
        
        if (!info) {
            return res.status(404).json({ message: "Personal information not found" });
        }

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
