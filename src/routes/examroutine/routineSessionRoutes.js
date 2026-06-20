// src/routes/examroutine/routineSessionRoutes.js
import express from 'express';
import { 
  getRoutineSessions, 
  createRoutineSession, 
  getRoutineSessionById, 
  updateRoutineSession, 
  deleteRoutineSession 
} from '../../controllers/examroutine/routineSessionController.js';

const router = express.Router();

router.route('/')
  .get(getRoutineSessions)
  .post(createRoutineSession);

router.route('/:id')
  .get(getRoutineSessionById)
  .put(updateRoutineSession)
  .delete(deleteRoutineSession);

export default router;