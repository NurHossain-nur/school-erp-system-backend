// src/routes/studentSummaryRoutes.js
import express from 'express';
import { getStudentSummary } from '../../controllers/studentreport/studentSummaryController.js';

const router = express.Router();
router.get('/', getStudentSummary);

export default router;