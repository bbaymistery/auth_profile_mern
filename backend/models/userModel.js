import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


/**
 * Auth userde bu istifade olunur 
 * Compares the entered password with the hashed password stored in the database.
 * @param {string} enteredPassword - The password entered by the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the entered password matches the hashed password, false otherwise.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Encrypt password using bcrypt
 * Middleware function that is executed before a new user document is saved to the database.
 * It checks if the password has been modified, and if so, it generates a salt and hashes the password using bcrypt before saving it to the database.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
