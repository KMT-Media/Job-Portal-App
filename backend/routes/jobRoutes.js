import express from 'express';
import {
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
  createJob,
  createAppliedJob,
  getAppliedJob,
  getAppliedJobById,
} from '../controllers/jobController.js';
import { protect, admin, employeer, employee } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getJobs).post(protect,employeer, createJob);
router
  .route('/:id')
  .get(getJobById)
  .delete(protect, employeer, deleteJob)
  .delete(protect, admin, deleteJob)
  .put(protect, updateJob)

router.route('/applied/:id').post(protect, createAppliedJob).get(getAppliedJobById)
router.route('/applied').get(getAppliedJob)
export default router;