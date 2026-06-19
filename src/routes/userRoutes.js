// src/routes/userRoutes.js
import express from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser, generatePin } from '../controllers/userController.js';

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/pin')
  .post(generatePin);

export default router;