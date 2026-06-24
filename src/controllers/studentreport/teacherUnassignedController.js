// src/controllers/studentreport/teacherUnassignedController.js
import Student from '../../models/students/Student.js';

export const getTeacherUnassignedReport = async (req, res, next) => {
  try {
    const { classShiftSection } = req.query;

    // Filter: Active students where teacher is empty or explicitly "Not Exists"
    let query = { 
      isActive: true,
      $or: [
        { responsibleTeacher: { $exists: false } },
        { responsibleTeacher: "" },
        { responsibleTeacher: "Not Exists" },
        { responsibleTeacher: null }
      ]
    };
    
    if (classShiftSection && classShiftSection !== 'All') {
      query.classShiftSection = classShiftSection;
    }

    const students = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ classShiftSection: 1, roll: 1 })
      .lean();

    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    next(error);
  }
};