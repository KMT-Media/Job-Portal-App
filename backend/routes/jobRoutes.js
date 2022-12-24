import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Jobs from '../models/jobsModels.js';

// Desc    Fetch app Jobs
// route   /api/jobs
// access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // find {} gives you everything
    const jobs = await Jobs.find({});
    res.json(jobs);
  })
);

// Desc    Fetch a single job
// route   /api/jobs/id
// access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // give a job in whatever there is in the browser parameter
    const job = await Jobs.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404);
      throw new Error('Job not found...');
    }
  })
);

export default router;
