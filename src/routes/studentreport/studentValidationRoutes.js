// src/routes/studentValidationRoutes.js
import express from 'express';
import { getValidationReport } from '../../controllers/studentreport/studentValidationController.js';

const router = express.Router();
router.get('/', getValidationReport);

export default router;