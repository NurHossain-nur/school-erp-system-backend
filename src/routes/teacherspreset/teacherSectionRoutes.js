// src/routes/teacherspreset/teacherSectionRoutes.js
import express from 'express';
import { 
  getTeacherSections, 
  getTeacherSectionById, 
  createTeacherSection, 
  updateTeacherSection, 
  deleteTeacherSection 
} from '../../controllers/teacherspreset/teacherSectionController.js';

const router = express.Router();

router.route('/')
  .get(getTeacherSections)
  .post(createTeacherSection);

router.route('/:id')
  .get(getTeacherSectionById)
  .put(updateTeacherSection)
  .delete(deleteTeacherSection);

export default router;