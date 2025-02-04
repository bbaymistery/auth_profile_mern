import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { throwError } from '../utils/errorResponse.js';


/**
 * Middleware function that protects routes by verifying the JWT token in the request cookies.
 * If a valid token is found, the middleware sets the `req.user` property with the user data.
 * If no token is found or the token is invalid, the middleware throws an error with a 401 status code.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be executed.
 * @returns {void}
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //without cookie parser we cant access jwt token from cookies
    token = req.cookies.jwt;

    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //we reach userId because we set it in generateToken.js
            //-minus password means => password is not included in user model
            //i can reach user data with getUserProfile route and whenever i want to get user data i can use req.user
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.error(error);
            throwError("Not authorized, token failed", 401)
        }

    } else {
        throwError("Not authorized, no token", 401);
    }
})

export { protect };