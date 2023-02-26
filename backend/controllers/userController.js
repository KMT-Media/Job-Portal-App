import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModels.js';
import Cv from '../models/cvModel.js';

// Desc    auth user & get token
// route   POST /api/users/login
// access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isJobSeeker: user.isJobSeeker,
      token: generateToken(user._id),
    });
  } else {
    // throw unauthorized error
    res.status(401);
    throw new Error('Invalid email or password!!!');
  }
});

// Desc    Get user profile
// route   Get /api/users/profile
// access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isJobSeeker: user.isJobSeeker,
    });
  } else {
    // User not found
    res.status(404);
    throw new Error('User not found!!!');
  }
});

// Desc    Get all users
// route   Get /api/users/
// access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// desc    Update user profile
// route   PUT /api/users/profile
// access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Desc    Register a new user
// route   Get /api/users/
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isJobSeeker } = req.body;

  // check user exists
  const userExists = await User.findOne({ email });

  // if exists then throw a bad request
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create user
  const createUser = await User.create({
    name,
    email,
    password,
    isJobSeeker,
  });

  // 201 (something is created)
  if (createUser) {
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      isJobSeeker: createUser.isJobSeeker,
      token: generateToken(createUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data...');
  }
});

// Desc    CREATE a new cv
// route   Get /api/users/jobs
// access  employee
const createCv = asyncHandler(async (req, res) => {
  const {
    name,
    gpa,
    graduatedAt,
    workExperience,
    languages
  } = req.body

  const createCv = await Cv.create({
    user: req.user._id,
    name,
    gpa,
    graduatedAt,
    workExperience,
    languages
  });

  // 201 (something is created)
  if (createCv) {
    res.status(201).json(createCv);
  } else {
    res.status(400);
    throw new Error('Invalid Cv data...');
  }
});

// desc    Delete user
// route   DELETE /api/users/:id
// access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// desc    Delete Cvs
// route   DELETE /api/users/jobs/:id
// access  Private/Admin
const deleteCv= asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);
  if (cv) {
    await cv.remove()
    res.json({ message: 'cv removed' });
  } else {
    res.status(404);
    throw new Error('cv not found');
  }
});


// Desc    Fetch all Cvs
// route   GET /api/Cvs
// access  Private/admin
const getCvs = asyncHandler(async (req, res) => {
  const cvs = await Cv.find({});
  res.json(cvs);
});

// Desc    Fetch a single sv by name
// route   GET /api/jobs/:keyword
// access  Public
const getCvByName = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;
  const cv = await Cv.find({ name: keyword });
  if (cv) {
    res.json(cv);
  } else {
    res.status(404);
    throw new Error('Cv not Found!!!');
  }
});

// Desc    Fetch a single job
// route   GET /api/users/jobs/:id
// access  private/employee
const getCvById = asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);
  if (cv) {
    res.json(cv);
  } else {
    res.status(404);
    throw new Error('Cv not found...');
  }
});

// Desc    Change job to approved
// route   put /api/users/jobs/:id
// access  private/employee
const updateCvById = asyncHandler(async (req, res) => {
  const {
    name,
    gpa,
    graduatedAt,
    workExperience,
    languages,
  } = req.body

  const cv = await Cv.findById(req.params.id)

  if (cv) {
    cv.name = name
    cv.gpa = gpa
    cv.graduatedAt = graduatedAt
    cv.workExperience = workExperience
    cv.languages = languages
    const updatedCv = await cv.save()
    res.json(updatedCv)
  } else {
    res.status(404)
    throw new Error('Cv to be updated is not found...')
  }
  });

  const approveCv = asyncHandler(async (req, res) => {
    const cv = await Cv.findById(req.params.id)
    if (cv) {
      cv.isApproved = isApproved
      cv.gpa = gpa
      cv.graduatedAt = graduatedAt
      cv.workExperience = workExperience
      cv.languages = languages
      const updatedCv = await cv.save()
      res.json(updatedCv)
    } else {
      res.status(404)
      throw new Error('Cv to be updated is not found...')
    }
    });

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  createCv,
  getCvs,
  deleteCv,
  getCvByName,
  getCvById,
  updateCvById,
  approveCv
};
