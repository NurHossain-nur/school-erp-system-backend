// src/controllers/facultyController.js
import Faculty from '../models/Faculty.js';

// @desc    Get all faculties (With Search)
// @route   GET /api/v1/faculties
export const getFaculties = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    
    // যদি ফ্রন্টএন্ড থেকে সার্চ টার্ম আসে, তবে সে অনুযায়ী ফিল্টার করবে
    if (search) {
      query.nameEnglish = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const faculties = await Faculty.find(query).sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: faculties });
  } catch (error) { next(error); }
};

// @desc    Get single faculty
// @route   GET /api/v1/faculties/:id
export const getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.status(200).json({ success: true, data: faculty });
  } catch (error) { next(error); }
};

// @desc    Create new faculty
// @route   POST /api/v1/faculties
export const createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json({ success: true, message: 'Faculty added successfully', data: faculty });
  } catch (error) { next(error); }
};

// @desc    Update faculty
// @route   PUT /api/v1/faculties/:id
export const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.status(200).json({ success: true, message: 'Faculty updated successfully', data: faculty });
  } catch (error) { next(error); }
};

// @desc    Delete faculty
// @route   DELETE /api/v1/faculties/:id
export const deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.status(200).json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) { next(error); }
};