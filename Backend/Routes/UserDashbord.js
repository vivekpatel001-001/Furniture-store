// userRoutes.js
import express from 'express';
import verifyUser  from '../Middleware/verfiyeadminMiddlware.js';  // User verification middleware
import { getUserDashboard } from '../Controller/Usercontrolller.js';

const router = express.Router();

// User dashboard ko verifyUser middleware se secure karna
router.get('/dashboard', verifyUser, getUserDashboard);

export default router;
