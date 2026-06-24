// src/controllers/studentreport/studentSearchController.js
import Student from '../../models/students/Student.js';

export const getStudentSearchReport = async (req, res, next) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required." });
    }

    // Fetch all records for this student ID, sort by year descending
    const students = await Student.find({ studentId })
      .sort({ year: -1 })
      .lean();

    if (!students || students.length === 0) {
      return res.status(200).json({ success: true, profile: null, academicRecords: [] });
    }

    // The profile details can be extracted from the most recent academic record
    const profile = students[0];

    res.status(200).json({ 
      success: true, 
      profile, 
      academicRecords: students 
    });

  } catch (error) {
    next(error);
  }
};