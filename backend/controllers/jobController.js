import asyncHandler from 'express-async-handler';
import Jobs from '../models/jobsModels.js';
import JobApplication from '../models/JobApplication.js';

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
    throw new Error('Product not Found!!!')
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


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
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
  } = req.body

  const job = await Jobs.findById(req.params.id)

  if (job) {
    job.companyName = companyName
    job.featured = featured
    job.title = title
    job.jobLevel = jobLevel
    job.type = type
    job.location = location
    job.workLocation = workLocation
    job.description = description
    job.numberOfEmployee = numberOfEmployee
    job.jobCategory = jobCategory
    job.skills = skills
    const updatedJob = await job.save()
    res.json(updatedJob)
  } else {
    res.status(404)
    throw new Error('Job not found')
  }
})

const createAppliedJob = asyncHandler(async (req, res) => {
  const { userApplied } = req.body
  const jobById = await Jobs.findById(req.url.split('/')[2]);
  const jobApplied = new JobApplication({
    job: jobById._id,
    userApplied: userApplied,
  });

  // save in the data base
  const createdJob = await jobApplied.save();
  res.status(201).json(createdJob);
});

const getAppliedJobById = asyncHandler(async (req, res) => {
  const job = await JobApplication.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Job not Found!!!')
  }
});
const getAppliedJob = asyncHandler(async (req, res) => {
  const jobApp = await JobApplication.find({});
  console.log(jobApp)
  res.json(jobApp);
});

export { getJobById, getJobs, deleteJob, updateJob, createJob, createAppliedJob, getAppliedJobById, getAppliedJob };