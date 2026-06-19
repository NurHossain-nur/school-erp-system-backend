// src/routes/sectionRoutes.js
import express from 'express';
import { getSections, createSection, getSectionById, updateSection, deleteSection } from '../controllers/sectionController.js';

const router = express.Router();

router.route('/')
  .get(getSections)
  .post(createSection);

router.route('/:id')
  .get(getSectionById)
  .put(updateSection)
  .delete(deleteSection);

export default router;