import express from 'express';
import { registerUser } from '../Controller/RegisterController.js';
import { loginUser } from '../Controller/Logincontroller.js';
import authenticateUser from '../Middleware/authmiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
