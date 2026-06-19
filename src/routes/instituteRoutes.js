// src/routes/instituteRoutes.js
import express from 'express';
import { getInstitute, upsertInstitute } from '../controllers/instituteController.js';

const router = express.Router();

// একই রাউটে GET এবং PUT মেথড
router.route('/')
  .get(getInstitute)
  .put(upsertInstitute);

export default router;