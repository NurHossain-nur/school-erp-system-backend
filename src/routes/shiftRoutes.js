// src/routes/shiftRoutes.js
import express from 'express';
import { getShifts, createShift, getShiftById, updateShift, deleteShift } from '../controllers/shiftController.js';

const router = express.Router();

router.route('/').get(getShifts).post(createShift);
router.route('/:id').get(getShiftById).put(updateShift).delete(deleteShift);

export default router;