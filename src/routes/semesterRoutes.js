// src/routes/semesterRoutes.js
import express from 'express';
import { getSemesters, createSemester, getSemesterById, updateSemester, deleteSemester } from '../controllers/semesterController.js';

const router = express.Router();

router.route('/').get(getSemesters).post(createSemester);
router.route('/:id').get(getSemesterById).put(updateSemester).delete(deleteSemester);

export default router;