// src/routes/teacherspreset/teacherQualificationRoutes.js
import express from 'express';
import { 
  getTeacherQualifications, getTeacherQualificationById, createTeacherQualification, 
  updateTeacherQualification, deleteTeacherQualification 
} from '../../controllers/teacherspreset/teacherQualificationController.js';

const router = express.Router();

router.route('/').get(getTeacherQualifications).post(createTeacherQualification);
router.route('/:id').get(getTeacherQualificationById).put(updateTeacherQualification).delete(deleteTeacherQualification);

export default router;
