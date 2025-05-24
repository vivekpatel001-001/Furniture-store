import { updateProduct } from "../Controller/ProductController.js";
import {getAllUsers,blokeUser,unblockUser, deleteUser,totalCount} from "../Controller/Usercontroller.js";
import adminMiddleware from "../Controller/admineController.js";
import express from "express"
const router = express.Router();
router.get('/getalluser', adminMiddleware,getAllUsers);
router.put('/block/:id', adminMiddleware,blokeUser);
router.put('/unblock/:id', adminMiddleware,unblockUser);
router.delete('/delete/:id',adminMiddleware,deleteUser)
router.get('/total',totalCount ,)

export default router;
// User Mangment done  in Backend 