import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  getAllUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  GET all users (Admin) | POST register new user
router.route('/').get(protect, admin, getAllUsers).post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
