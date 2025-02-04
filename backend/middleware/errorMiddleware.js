import ErrorResponse from "../utils/errorResponse.js";


/**
 * Middleware function that handles requests for non-existent routes.
 * 
 * This middleware function is called when a request is made for a route that does not exist.
 * It creates a new error object with a 404 status code and the original URL, and passes it to the next middleware function.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};



/**
 * Middleware function that handles errors in the application.
 *
 * This middleware function is called when an error occurs in the application. It sets the appropriate HTTP status code based on the error, and sends a JSON response with the error message and optionally the stack trace (in non-production environments).
 *
 * If the error is a `CastError` with a `kind` of `'ObjectId'`, it sets the status code to 404 and the message to "Resource not found". If the error is an instance of the `ErrorResponse` class, it uses the `statusCode` property of the error.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const errorHandler = (err, req, res, next) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    // If it's our custom error, use its status code
    if (err instanceof ErrorResponse) statusCode = err.statusCode;

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}
