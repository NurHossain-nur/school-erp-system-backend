// src/routes/gradePointRoutes.js
import express from 'express';
import { getGradePoints, createGradePoint, getGradePointById, updateGradePoint, deleteGradePoint, addDefaultData } from '../controllers/gradePointController.js';

const router = express.Router();

router.post('/default', addDefaultData); // Default route টি উপরে রাখতে হবে
router.route('/').get(getGradePoints).post(createGradePoint);
router.route('/:id').get(getGradePointById).put(updateGradePoint).delete(deleteGradePoint);

export default router;