import express from 'express';
import {
  getDayWiseAdmissionReport,
  getClassShiftSectionList
} from '../../controllers/studentreport/dayWiseAdmissionReportController.js';

const router = express.Router();

router.get('/', getDayWiseAdmissionReport);
router.get('/class-shift-section-list', getClassShiftSectionList);

export default router;