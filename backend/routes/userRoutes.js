import express from 'express';
import {
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
} from '../controllers/userController.js';
import { protect, admin, employee, employeer} from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

router.route('/jobs').get(getCvs).post(protect, createCv)
router.route('/jobs/:id').delete(deleteCv).get(getCvById).put(updateCvById).put(protect, admin, approveCv);
router.route('/jobs/:keyword').get(getCvByName)

export default router;