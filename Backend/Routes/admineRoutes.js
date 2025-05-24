import express from 'express';
import adminMiddleware from '../Controller/admineController.js';

const router = express.Router();

// सिर्फ admin को accessible
router.get('/dashboard', adminMiddleware, (req, res) => {
  res.json({
    message: "welcome to admine dasbord ",
    admin: req.user.name,
  });
});

export default router;
