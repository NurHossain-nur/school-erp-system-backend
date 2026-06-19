// src/routes/branchRoutes.js
import express from 'express';
import { getBranches, createBranch, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController.js';

const router = express.Router();

router.route('/')
  .get(getBranches)
  .post(createBranch);

router.route('/:id')
  .get(getBranchById)
  .put(updateBranch)
  .delete(deleteBranch);

export default router;