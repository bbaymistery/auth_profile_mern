import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token and sets it as a cookie on the response object.
 *
 * @param {Object} res - The Express response object.
 * @param {string} userId - The ID of the user to include in the token payload.
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};

export default generateToken;
