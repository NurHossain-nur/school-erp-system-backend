// src/routes/termRoutes.js
import express from 'express';
import { getTerms, createTerm, getTermById, updateTerm, deleteTerm } from '../controllers/termController.js';

const router = express.Router();

router.route('/').get(getTerms).post(createTerm);
router.route('/:id').get(getTermById).put(updateTerm).delete(deleteTerm);

export default router;