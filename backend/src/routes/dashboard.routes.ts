import express from 'express';
import { 
  getDashboardStats, 
  getAnalytics, 
  getSystemHealth 
} from '../controllers/dashboard.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// All routes are protected and admin only
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/analytics', getAnalytics);
router.get('/health', getSystemHealth);

export default router;
