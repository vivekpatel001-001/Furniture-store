import jwt from 'jsonwebtoken';
import User from '../Model/RegisterModel.js';

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
     console.log("Authorization Header:", authHeader); 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token nahi mila' });
    }

    const token = authHeader.split(' ')[1];

    // ✅ First decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Vivek123');

    // ✅ Now use decoded.id to get user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User nahi mila' });
    }

    // ✅ Attach user info to request
    req.user = decoded; // decoded me hota hai user ka payload: { id, name, email, role, ... }

    next(); // ✅ Proceed to next middleware or route handler
  } catch (error) {
    console.log('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: ' + error.message });
  }
};

export default authenticateUser;
