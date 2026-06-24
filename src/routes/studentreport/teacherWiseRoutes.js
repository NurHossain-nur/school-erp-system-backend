// src/routes/teacherWiseRoutes.js
import express from 'express';
import { getTeacherWiseReport } from '../../controllers/studentreport/teacherWiseController.js';

const router = express.Router();
router.get('/', getTeacherWiseReport);

export default router;