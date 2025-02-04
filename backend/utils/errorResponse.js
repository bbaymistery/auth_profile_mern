/**
 * Represents an error response with a custom status code.
 * This class extends the built-in Error class and adds a `statusCode` property to the error object.
 * It can be used to create custom error responses with a specific HTTP status code.
 */
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export default ErrorResponse;

/**
 * Throws a custom ErrorResponse with the provided message and status code.
 * @param {string} message - The error message to include in the ErrorResponse.
 * @param {number} [statusCode=400] - The HTTP status code to associate with the ErrorResponse. Defaults to 400 (Bad Request).
 * @throws {ErrorResponse} - The custom ErrorResponse with the provided message and status code.
 */
export const throwError = (message, statusCode = 400) => {
    throw new ErrorResponse(message, statusCode);
};

