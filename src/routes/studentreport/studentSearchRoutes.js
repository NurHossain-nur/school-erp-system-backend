// src/routes/studentSearchRoutes.js
import express from 'express';
import { getStudentSearchReport } from '../../controllers/studentreport/studentSearchController.js';

const router = express.Router();
router.get('/', getStudentSearchReport);

export default router;