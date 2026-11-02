import { Request, Response } from 'express';
import { User } from '../models/user.model';
import logger from '../utils/logger';

// ✅ 1. Get all users (Admin only)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(limit).skip(startIndex);

    res.json({ success: true, count: users.length, total, data: users });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 2. Get single user
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 3. Create new user (Admin only) - FIX: Explicitly added for routes
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    logger.error('Create user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 4. Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password') as any;

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    logger.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 5. Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 6. Update Profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password") as any;
    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 7. Change Password
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId).select("+password");

    if (!user || !(await user.comparePassword(currentPassword))) {
      res.status(400).json({ success: false, message: "Invalid current password" });
      return;
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 8. Toggle Status
export const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Toggle status error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};