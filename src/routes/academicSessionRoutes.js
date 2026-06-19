// src/routes/academicSessionRoutes.js
import express from 'express';
import { getSessions, createSession, getSessionById, updateSession, deleteSession } from '../controllers/academicSessionController.js';

const router = express.Router();

router.route('/').get(getSessions).post(createSession);
router.route('/:id').get(getSessionById).put(updateSession).delete(deleteSession);

export default router;