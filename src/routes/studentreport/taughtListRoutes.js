// src/routes/taughtListRoutes.js
import express from 'express';
import { getTaughtListReport } from '../../controllers/studentreport/taughtListController.js';

const router = express.Router();
router.get('/', getTaughtListReport);

export default router;