import jwt from 'jsonwebtoken';
import User from '../Model/RegisterModel.js';

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is not define " });

    const decoded = jwt.verify(token, 'Vivek123'); // इसे .env से लो
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "only acees can by admine " });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid " });
  }
};

export default adminMiddleware;