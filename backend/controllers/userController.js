/**
 @desc asyncHandler helps us to not have to use try catch blocks
 */
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { throwError } from '../utils/errorResponse.js';
import { sendResponse } from '../utils/succesResponse.js';



/**
 * Authenticates a user and sets the token.
 *
 * @route POST /api/users/auth
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // First check if email exists
    const user = await User.findOne({ email });
    if (!user) throwError("Email does  not exist");

    // Then check password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) throwError("Invalid password");

    // If both checks pass, generate token and send response
    generateToken(res, user._id);
    let data = { _id: user._id, name: user.name, email: user.email }
    sendResponse(res, data, 201, 'User logged in successfully');
})

/**
 * Register a new user.
 *
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) throwError("User already exists");

    const user = await User.create({ name, email, password });

    if (user) {
        generateToken(res, user._id);
        let data = { _id: user._id, name: user.name, email: user.email }
        sendResponse(res, data, 201, 'User registered successfully');
    } else {
        throwError("Invalid user data");
    }
})


/**
 * Logout user
 *
 * @route POST /api/users/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', "", { httpOnly: true, expires: new Date(0) });
    sendResponse(res, {}, 200, 'User logged out successfully');
})

/**
 * Get user profile
 *
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        let data = { _id: user._id, name: user.name, email: user.email }
        sendResponse(res, data, 200, 'User Profile');
    } else {
        throwError("User not found", 404);
    }
    res.status(200).json({ message: "User Profile", user: req.user });
})

/**
 * Update user profile
 *
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        let data = { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email }
        sendResponse(res, data, 200, 'User Profile updated successfully');
    } else {
        throwError("User not found", 404);
    }

})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };