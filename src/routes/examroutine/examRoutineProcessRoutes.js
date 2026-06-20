// src/routes/examroutine/examRoutineProcessRoutes.js
import express from 'express';
import { getExamRoutinesByExamName, saveExamRoutineProcess } from '../../controllers/examroutine/examRoutineProcessController.js';

const router = express.Router();

router.route('/')
  .get(getExamRoutinesByExamName)
  .post(saveExamRoutineProcess);

export default router;