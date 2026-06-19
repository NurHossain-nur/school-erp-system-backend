// src/routes/facultyRoutes.js
import express from 'express';
import { getFaculties, createFaculty, getFacultyById, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';

const router = express.Router();

router.route('/').get(getFaculties).post(createFaculty);
router.route('/:id').get(getFacultyById).put(updateFaculty).delete(deleteFaculty);

export default router;