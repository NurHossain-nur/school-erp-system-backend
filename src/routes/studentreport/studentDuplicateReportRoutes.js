import express from 'express';
import { getStudentDuplicateReport } from '../../controllers/studentreport/studentDuplicateReportController.js';

const router = express.Router();

router.get('/', getStudentDuplicateReport);

export default router;