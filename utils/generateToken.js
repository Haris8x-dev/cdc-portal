import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
    // 1. Create the JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token lasts for 30 days
    });

    // 2. Set the Cookie
    res.cookie('jwt', token, {
        httpOnly: true, // Prevents XSS attacks (cookie not accessible via JS)
        secure: process.env.NODE_ENV !== 'development', // Only use HTTPS in production
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    return token;
};

export default generateTokenAndSetCookie;