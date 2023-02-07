import express from 'express';
import {
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
  createJob,
} from '../controllers/jobController.js';
import { protect, admin, employeer } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getJobs).post(protect, employeer, createJob);
router
  .route('/:id')
  .get(getJobById)
  .delete(protect, admin, deleteJob)
  .put(protect, employeer, updateJob);
export default router;
