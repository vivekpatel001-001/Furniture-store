// // authMiddleware.js
// import jwt from 'jsonwebtoken';

// export const verifyAdmin = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];  // Bearer token se token nikaalna
//   if (!token) {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Agar role admin hai tabhi aage process hoga
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(400).json({ message: 'Invalid token' });
//   }
// };
