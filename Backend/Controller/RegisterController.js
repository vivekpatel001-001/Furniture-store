import User from '../Model/RegisterModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Case-insensitive email check
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user - let the model handle password hashing
    const user = new User({ 
      name, 
      email: email.toLowerCase(), // Store email in lowercase
      phone, 
      password, // Will be hashed by pre-save hook
      role 
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        
      },
      process.env.JWT_SECRET || 'Vivek123',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: error.message 
    });
  }
};