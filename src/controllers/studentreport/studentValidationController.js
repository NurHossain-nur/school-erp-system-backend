// src/controllers/studentreport/studentValidationController.js
import Student from '../../models/students/Student.js';

export const getValidationReport = async (req, res, next) => {
  try {
    const { classShiftSection, wrongMobileOnly } = req.query;

    let query = { isActive: true }; // Only validate currently active students
    
    if (classShiftSection && classShiftSection !== 'All') {
      query.classShiftSection = classShiftSection;
    }

    // Fetch students
    const students = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ classShiftSection: 1, roll: 1 })
      .lean();

    let filteredStudents = students;

    // Standard Bangladeshi mobile number Regex: exactly 11 digits starting with 013-019
    const bdMobileRegex = /^01[3-9]\d{8}$/;

    // 💡 Strict Filtering Logic
    if (wrongMobileOnly === 'Yes') {
      // Keep ONLY students whose number FAILS the regex (Wrong Numbers)
      filteredStudents = students.filter(student => {
        const mobile = student.guardianMobile1 ? student.guardianMobile1.trim() : '';
        return !bdMobileRegex.test(mobile); 
      });
    } else if (wrongMobileOnly === 'No') {
      // Keep ONLY students whose number PASSES the regex (Correct Numbers)
      filteredStudents = students.filter(student => {
        const mobile = student.guardianMobile1 ? student.guardianMobile1.trim() : '';
        return bdMobileRegex.test(mobile); 
      });
    }

    res.status(200).json({ 
      success: true, 
      count: filteredStudents.length, 
      data: filteredStudents 
    });

  } catch (error) {
    next(error);
  }
};