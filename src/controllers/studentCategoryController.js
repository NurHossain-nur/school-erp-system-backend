// src/controllers/studentCategoryController.js
import StudentCategory from '../models/StudentCategory.js';

// @desc    Get all student categories
// @route   GET /api/v1/student-categories
export const getStudentCategories = async (req, res, next) => {
  try {
    const categories = await StudentCategory.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) { next(error); }
};

// @desc    Get single student category
// @route   GET /api/v1/student-categories/:id
export const getStudentCategoryById = async (req, res, next) => {
  try {
    const category = await StudentCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (error) { next(error); }
};

// @desc    Create new student category
// @route   POST /api/v1/student-categories
export const createStudentCategory = async (req, res, next) => {
  try {
    const category = await StudentCategory.create(req.body);
    res.status(201).json({ success: true, message: 'Category added successfully', data: category });
  } catch (error) { next(error); }
};

// @desc    Update student category
// @route   PUT /api/v1/student-categories/:id
export const updateStudentCategory = async (req, res, next) => {
  try {
    const category = await StudentCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
  } catch (error) { next(error); }
};

// @desc    Delete student category
// @route   DELETE /api/v1/student-categories/:id
export const deleteStudentCategory = async (req, res, next) => {
  try {
    const category = await StudentCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) { next(error); }
};