import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModels.js';

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

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
};
