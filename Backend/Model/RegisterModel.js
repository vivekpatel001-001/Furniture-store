import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  address: {
    type: String,
    default: '',
  },

  profileImage: {
    type: String,
    default: '',
  },
  //  bloked admine panel mate 6 
  isBlocked: {
    type: Boolean,
    default: false,
  },


}, { timestamps: true }); 
userSchema.pre('save', async function (next) {
  // Only hash if password is modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Normalize email before saving
    if (this.isModified('email')) {
      this.email = this.email.toLowerCase().trim();
    }
    
    // Hash password with salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('User', userSchema);
