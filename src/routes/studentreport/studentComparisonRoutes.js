// src/routes/studentComparisonRoutes.js
import express from 'express';
import { getComparisonReport } from '../../controllers/studentreport/comparisonController.js';

const router = express.Router();
router.get('/', getComparisonReport);

export default router;