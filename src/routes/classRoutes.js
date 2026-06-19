// src/routes/classRoutes.js
import express from 'express';
import { getClasses, createClass, getClassById, updateClass, deleteClass } from '../controllers/classController.js';

const router = express.Router();

router.route('/').get(getClasses).post(createClass);
router.route('/:id').get(getClassById).put(updateClass).delete(deleteClass);

export default router;