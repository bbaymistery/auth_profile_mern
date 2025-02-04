import mongoose from 'mongoose';

/**
 * @desc Connects to the MongoDB database using the environment variable `MONGO_URI`.
 * @desc Logs a message to the console when the connection is successful, or logs an error message and exits the process if the connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
