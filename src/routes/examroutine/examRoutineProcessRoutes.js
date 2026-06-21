// src/routes/examroutine/examRoutineProcessRoutes.js
import express from 'express';
import { getExamRoutinesByExamName, saveExamRoutineProcess, deleteExamRoutineProcess } from '../../controllers/examroutine/examRoutineProcessController.js';

const router = express.Router();

router.route('/')
  .get(getExamRoutinesByExamName)
  .post(saveExamRoutineProcess)
  .delete(deleteExamRoutineProcess);

export default router;