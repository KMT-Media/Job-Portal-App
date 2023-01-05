import asyncHandler from 'express-async-handler';
import Jobs from '../models/jobsModels.js';

// Desc    Fetch all Jobs
// route   GET /api/jobs
// access  Public
const getJobs = asyncHandler(async (req, res) => {
  // find {} gives you everything
  const jobs = await Jobs.find({});
  res.json(jobs);
});

// Desc    Fetch a single job
// route   GET /api/jobs/:id
// access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Product not Found!!!');
  }
});

export { getJobById, getJobs };
