// src/controllers/studentreport/teacherWiseController.js
import Student from '../../models/students/Student.js';

export const getTeacherWiseReport = async (req, res, next) => {
  try {
    const { year, teacherName } = req.query;

    let query = { isActive: true };
    
    if (year) query.year = year;
    if (teacherName) query.responsibleTeacher = teacherName;

    // Fetch and sort students cleanly
    const students = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ className: 1, shift: 1, section: 1, roll: 1 })
      .lean();

    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students 
    });

  } catch (error) {
    next(error);
  }
};