// src/routes/disciplinaryActionRoutes.js
import express from 'express';
import { 
  getActions, getActionById, createAction, updateAction, deleteAction 
} from '../../controllers/students/disciplinaryActionController.js';

const router = express.Router();

router.get('/', getActions);
router.post('/', createAction);
router.get('/:id', getActionById);
router.put('/:id', updateAction);
router.delete('/:id', deleteAction);

export default router;