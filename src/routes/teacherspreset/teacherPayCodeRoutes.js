// src/routes/teacherspreset/teacherPayCodeRoutes.js
import express from 'express';
import { 
  getTeacherPayCodes, getTeacherPayCodeById, createTeacherPayCode, 
  updateTeacherPayCode, deleteTeacherPayCode 
} from '../../controllers/teacherspreset/teacherPayCodeController.js';

const router = express.Router();

router.route('/').get(getTeacherPayCodes).post(createTeacherPayCode);
router.route('/:id').get(getTeacherPayCodeById).put(updateTeacherPayCode).delete(deleteTeacherPayCode);

export default router;