// src/routes/generalSetting/occupationRoutes.js
import express from 'express';
import { 
  getOccupations, 
  createOccupation, 
  getOccupationById, 
  updateOccupation, 
  deleteOccupation 
} from '../../controllers/generalSetting/occupationController.js';

const router = express.Router();

router.route('/').get(getOccupations).post(createOccupation);
router.route('/:id').get(getOccupationById).put(updateOccupation).delete(deleteOccupation);

export default router;