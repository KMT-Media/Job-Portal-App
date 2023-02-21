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

// description    Create Job
// route          POST /api/jobs
// access         Private/employeer
const createJob = asyncHandler(async (req, res) => {
  const job = new Jobs({
    user: req.user._id,
    companyName: 'Sample Company...',
    featured: true,
    title: 'Sample Job titile...',
    jobLevel: 'Senior',
    type: 'Full time, contrat...',
    location: 'Remote or Contrat',
    workLocation: 'Dire Dawa',
    description: 'Shord description...',
    numberOfEmployee: 0,
    jobCategory: 'Technology',
    skills: 'list of Skills',
  });

  // save in the data base
  const createdJob = await job.save();
  res.status(201).json(createdJob);
});

// description    Update job
// route          PUT /api/jobs/:id
// access         Private/employer
const updateJob = asyncHandler(async (req, res) => {
  const {
    companyName,
    featured,
    title,
    jobLevel,
    type,
    location,
    workLocation,
    description,
    numberOfEmployee,
    jobCategory,
    skills,
  } = req.body;

  const job = await Jobs.findById(req.params.id);

  if (job) {
    job.companyName = companyName;
    job.featured = featured;
    job.title = title;
    job.jobLevel = jobLevel;
    job.type = type;
    job.location = location;
    job.description = description;
    job.workLocation = workLocation;
    job.numberOfEmployee = numberOfEmployee;
    job.jobCategory = jobCategory;
    job.skills = skills;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404);
    throw new Error('Job Not Found...');
  }
});

// Desc    Register a new user
// route   Get /api/jobs/
// access  Private/employeer
const createJob2 = asyncHandler(async (req, res) => {
  const {
    companyName,
    featured,
    title,
    jobLevel,
    type,
    location,
    workLocation,
    description,
    numberOfEmployee,
    jobCategory,
    skills,
  } = req.body;

  const createJob = await Jobs.create({
    companyName,
    featured,
    title,
    jobLevel,
    type,
    location,
    workLocation,
    description,
    numberOfEmployee,
    jobCategory,
    skills,
  });

  if (createJob) {
    res.status(201).json({
      _id: createJob._id,
      name: createJob.name,
      email: createJob.email,
      isAdmin: createJob.isAdmin,
      isJobSeeker: createJob.isJobSeeker,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data...');
  }
});

export { getJobById, getJobs, deleteJob, updateJob, createJob };
