// src/controllers/teachers/teacherController.js
import Teacher from '../../models/teachers/Teacher.js';

export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: teachers });
  } catch (error) { next(error); }
};

export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.status(200).json({ success: true, data: teacher });
  } catch (error) { next(error); }
};

export const createTeacher = async (req, res, next) => {
  try {
    let teacherData = { ...req.body };

    // 💡 Teacher ID Auto-generation logic
    if (!teacherData.teacherId || teacherData.teacherId.trim() === '') {
      const lastTeacher = await Teacher.findOne({ teacherId: { $regex: /^\d+$/ } })
        .sort({ teacherId: -1 })
        .collation({ locale: "en_US", numericOrdering: true });
      
      let nextId = 80001; // Default starting ID
      if (lastTeacher && !isNaN(lastTeacher.teacherId)) {
        nextId = parseInt(lastTeacher.teacherId) + 1;
      }
      teacherData.teacherId = nextId.toString();
    } else {
      // Check manual ID uniqueness
      const existing = await Teacher.findOne({ teacherId: teacherData.teacherId });
      if (existing) return res.status(400).json({ success: false, message: 'This Teacher ID is already taken.' });
    }

    const newTeacher = await Teacher.create(teacherData);
    res.status(201).json({ success: true, message: 'Teacher added successfully', data: newTeacher });
  } catch (error) { next(error); }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.status(200).json({ success: true, message: 'Teacher updated successfully', data: updatedTeacher });
  } catch (error) { next(error); }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) { next(error); }
};