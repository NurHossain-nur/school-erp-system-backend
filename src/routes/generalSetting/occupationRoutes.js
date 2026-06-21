// src/routes/generalsetting/occupationRoutes.js
import express from 'express';
import { 
  getOccupations, 
  createOccupation, 
  getOccupationById, 
  updateOccupation, 
  deleteOccupation 
} from '../../controllers/generalsetting/occupationController.js';

const router = express.Router();

router.route('/').get(getOccupations).post(createOccupation);
router.route('/:id').get(getOccupationById).put(updateOccupation).delete(deleteOccupation);

export default router;