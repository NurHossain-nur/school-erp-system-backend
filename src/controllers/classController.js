// src/controllers/classController.js
import Class from '../models/Class.js';

// @desc    Get all classes
export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: classes });
  } catch (error) { next(error); }
};

// @desc    Get single class
export const getClassById = async (req, res, next) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) return res.status(404).json({ success: false, message: 'Class not found' });
    res.status(200).json({ success: true, data: classData });
  } catch (error) { next(error); }
};

// @desc    Create new class
export const createClass = async (req, res, next) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json({ success: true, message: 'Class added successfully', data: newClass });
  } catch (error) { next(error); }
};

// @desc    Update class
export const updateClass = async (req, res, next) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedClass) return res.status(404).json({ success: false, message: 'Class not found' });
    res.status(200).json({ success: true, message: 'Class updated successfully', data: updatedClass });
  } catch (error) { next(error); }
};

// @desc    Delete class
export const deleteClass = async (req, res, next) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ success: false, message: 'Class not found' });
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) { next(error); }
};