import jwt from 'jsonwebtoken';
import User from '../Model/RegisterModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token nahi mila" });

    const decoded = jwt.verify(token, 'Vivek123'); // Secret key same rakhna
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User nahi mila" });

    req.user = user;  // Ye zaroori hai
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token galat hai" });
  }
};
