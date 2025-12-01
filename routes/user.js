import express from 'express';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';
import { validate } from '../middlewares/validate.js';
const router = express.Router();

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

// Admin-only routes
router.get('/', protect, admin, getUsers);          // Get all users
router.post('/', protect, admin, validate(createUserSchema), createUser);      // Create a new user
router.put('/:id', protect, admin, validate(updateUserSchema), updateUser);    // Update user
router.delete('/:id', protect, admin, deleteUser); // Delete user

export default router;
