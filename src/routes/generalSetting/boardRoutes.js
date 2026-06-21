// src/routes/generalsetting/boardRoutes.js
import express from 'express';
import { getBoards, createBoard, getBoardById, updateBoard, deleteBoard } from '../../controllers/generalsetting/boardController.js';

const router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:id').get(getBoardById).put(updateBoard).delete(deleteBoard);

export default router;