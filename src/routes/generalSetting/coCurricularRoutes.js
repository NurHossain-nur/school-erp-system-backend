// src/routes/generalSetting/coCurricularRoutes.js
import express from 'express';
import { getCoCurriculars, createCoCurricular, getCoCurricularById, updateCoCurricular, deleteCoCurricular } from '../../controllers/generalSetting/coCurricularController.js';

const router = express.Router();

router.route('/').get(getCoCurriculars).post(createCoCurricular);
router.route('/:id').get(getCoCurricularById).put(updateCoCurricular).delete(deleteCoCurricular);

export default router;