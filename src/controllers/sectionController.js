// src/controllers/sectionController.js
import Section from '../models/Section.js';

// @desc    Get all sections
// @route   GET /api/v1/sections
export const getSections = async (req, res, next) => {
  try {
    // Order No অনুযায়ী সাজিয়ে ডাটা পাঠানো হচ্ছে
    const sections = await Section.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: sections });
  } catch (error) { next(error); }
};

// @desc    Get single section
// @route   GET /api/v1/sections/:id
export const getSectionById = async (req, res, next) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, data: section });
  } catch (error) { next(error); }
};

// @desc    Create new section
// @route   POST /api/v1/sections
export const createSection = async (req, res, next) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json({ success: true, message: 'Section added successfully', data: section });
  } catch (error) { next(error); }
};

// @desc    Update section
// @route   PUT /api/v1/sections/:id
export const updateSection = async (req, res, next) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, message: 'Section updated successfully', data: section });
  } catch (error) { next(error); }
};

// @desc    Delete section
// @route   DELETE /api/v1/sections/:id
export const deleteSection = async (req, res, next) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, message: 'Section deleted successfully' });
  } catch (error) { next(error); }
};