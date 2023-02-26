import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const employeer = (req, res, next) => {
  if (req.user && !req.user.isJobSeeker) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an employeer');
  }
};


// const employee = (req, res, next) => {
//   if (req.user && req.user.isJobSeeker) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized as an employee');
//   }
// };

const employee = (req, res, next) => {
    const user = User.findOne({isJobSeeker: true}).select('-password');
    console.log(user)
    if (req.user && req.user.isJobSeeker) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an employee');
  }
};

// const employee = asyncHandler(async (req, res, next) => {
//   let token;

//   // get token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select('-password');

//       console.log(req.user)
//       if(!req.user.isJobSeeker){
//         next();
//       }
//     } catch (error) {
//       res.status(401);
//       throw new Error('Not authorized, as employee');
//     }
//   }

// });


export { protect, admin, employeer, employee };
