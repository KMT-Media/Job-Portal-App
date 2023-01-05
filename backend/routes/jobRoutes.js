import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';
const router = express.Router();

router.route('/').get(getJobs);
router.route('/:id').get(getJobById);

export default router;
