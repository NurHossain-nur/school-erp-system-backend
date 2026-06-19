// src/routes/groupRoutes.js
import express from 'express';
import { getGroups, createGroup, getGroupById, updateGroup, deleteGroup } from '../controllers/groupController.js';

const router = express.Router();

router.route('/').get(getGroups).post(createGroup);
router.route('/:id').get(getGroupById).put(updateGroup).delete(deleteGroup);

export default router;