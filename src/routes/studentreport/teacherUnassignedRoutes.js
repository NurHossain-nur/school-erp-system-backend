// src/routes/teacherUnassignedRoutes.js
import express from 'express';
import { getTeacherUnassignedReport } from '../../controllers/studentreport/teacherUnassignedController.js';
const router = express.Router();

router.get('/', getTeacherUnassignedReport);
export default router;