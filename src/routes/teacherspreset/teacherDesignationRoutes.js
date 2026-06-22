// src/routes/teacherspreset/teacherDesignationRoutes.js
import express from 'express';
import { 
  getTeacherDesignations, getTeacherDesignationById, createTeacherDesignation, 
  updateTeacherDesignation, deleteTeacherDesignation 
} from '../../controllers/teacherspreset/teacherDesignationController.js';

const router = express.Router();

router.route('/').get(getTeacherDesignations).post(createTeacherDesignation);
router.route('/:id').get(getTeacherDesignationById).put(updateTeacherDesignation).delete(deleteTeacherDesignation);

export default router;