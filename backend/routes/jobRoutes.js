import express from 'express';
import {
  getJobs,
  getJobById,
  deleteJob,
} from '../controllers/jobController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getJobs);
router.route('/:id').get(getJobById).delete(protect, admin, deleteJob);
export default router;
