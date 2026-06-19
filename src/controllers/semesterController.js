// src/controllers/semesterController.js
import Semester from '../models/Semester.js';

// @desc    Get all semesters (with search)
export const getSemesters = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      // nameEnglish এর উপর ভিত্তি করে সার্চ করবে
      query.nameEnglish = { $regex: search, $options: 'i' };
    }

    const semesters = await Semester.find(query).sort({ level: 1 });
    res.status(200).json({ success: true, data: semesters });
  } catch (error) { next(error); }
};

export const getSemesterById = async (req, res, next) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    res.status(200).json({ success: true, data: semester });
  } catch (error) { next(error); }
};

export const createSemester = async (req, res, next) => {
  try {
    const semester = await Semester.create(req.body);
    res.status(201).json({ success: true, message: 'Semester added successfully', data: semester });
  } catch (error) { next(error); }
};

export const updateSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    res.status(200).json({ success: true, message: 'Semester updated successfully', data: semester });
  } catch (error) { next(error); }
};

export const deleteSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    res.status(200).json({ success: true, message: 'Semester deleted successfully' });
  } catch (error) { next(error); }
};