/**
 * Sends a JSON response with the provided data, status code, and message.
 *
 * @param {Object} res - The Express response object.
 * @param {*} data - The data to be sent in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response.
 * @param {string} [message='Success'] - The message to be included in the response.
 */
export const sendResponse = (res, data, statusCode = 200, message = 'Success') => {
  const response = { success: true, message, statusCode };

  // Only add data property if data is not an empty object
  if (data && Object.keys(data).length > 0) {
    response.data = data;
  }
  
  res.status(statusCode).json(response);
};