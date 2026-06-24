// src/routes/studentOffenseRoutes.js
import express from 'express';
import { 
  getOffenses, 
  getOffenseById, 
  createOffense, 
  updateOffense, 
  deleteOffense 
} from '../../controllers/students/studentOffenseController.js';

const router = express.Router();

router.get('/', getOffenses);
router.post('/', createOffense);
router.get('/:id', getOffenseById);
router.put('/:id', updateOffense);
router.delete('/:id', deleteOffense);

export default router;