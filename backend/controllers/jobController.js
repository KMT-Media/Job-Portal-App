import asyncHandler from 'express-async-handler';
import Jobs from '../models/jobsModels.js';

// Desc    Fetch all Jobs
// route   GET /api/jobs
// access  Public
const getJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const jobs = await Jobs.find({ ...keyword });
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

// desc    Delete job
// route   DELETE /api/jobs/:id
// access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Jobs.findById(req.params.id);

  if (job) {
    await job.remove();
    res.json({ message: 'Job removed' });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

export { getJobById, getJobs, deleteJob };
