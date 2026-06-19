// src/routes/mainMarkingHeadRoutes.js
import express from 'express';
import { getMarkingHeads, createMarkingHead, getMarkingHeadById, updateMarkingHead, copyMarkingHead } from '../controllers/mainMarkingHeadController.js';

const router = express.Router();

router.route('/').get(getMarkingHeads).post(createMarkingHead);
router.route('/:id').get(getMarkingHeadById).put(updateMarkingHead);
router.route('/:id/copy').post(copyMarkingHead); // কপি রাউট

export default router;