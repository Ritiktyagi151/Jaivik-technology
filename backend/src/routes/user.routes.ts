import express from 'express';
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  updateProfile, 
  changePassword, 
  toggleUserStatus 
} from '../controllers/user.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin only routes
router.get('/', admin, getUsers);
router.post('/', admin, createUser);
router.get('/:id', admin, getUser);
router.put('/:id', admin, updateUser);
router.delete('/:id', admin, moveToTrashBeforeDelete("User"));
router.put('/:id/toggle-status', admin, toggleUserStatus);

// User profile routes
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

export default router;
