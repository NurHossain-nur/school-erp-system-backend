// src/routes/studentreport/studentReportRoutes.js
import express from 'express';
import { getStudentReport } from '../../controllers/studentreport/studentReportController.js';

const router = express.Router();

router.get('/', getStudentReport);

export default router;