// src/routes/generalsetting/moralBehaviorRoutes.js
import express from 'express';
import { 
  getMoralBehaviors, 
  createMoralBehavior, 
  getMoralBehaviorById, 
  updateMoralBehavior, 
  deleteMoralBehavior 
} from '../../controllers/generalsetting/moralBehaviorController.js';

const router = express.Router();

router.route('/').get(getMoralBehaviors).post(createMoralBehavior);
router.route('/:id').get(getMoralBehaviorById).put(updateMoralBehavior).delete(deleteMoralBehavior);

export default router;