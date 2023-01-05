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
    res.status(401);
    throw new Error('Invalid email or password!!!');
  }
});

// Desc    Get user profile
// route   Get /api/users/profile
// access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Success');
});

export { authUser, getUserProfile };