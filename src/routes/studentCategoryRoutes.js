// src/routes/studentCategoryRoutes.js
import express from 'express';
import { 
  getStudentCategories, 
  createStudentCategory, 
  getStudentCategoryById, 
  updateStudentCategory, 
  deleteStudentCategory 
} from '../controllers/studentCategoryController.js';

const router = express.Router();

router.route('/')
  .get(getStudentCategories)
  .post(createStudentCategory);

router.route('/:id')
  .get(getStudentCategoryById)
  .put(updateStudentCategory)
  .delete(deleteStudentCategory);

export default router;