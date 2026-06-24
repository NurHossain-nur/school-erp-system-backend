// src/controllers/studentreport/taughtListController.js
import Student from '../../models/students/Student.js';

export const getTaughtListReport = async (req, res, next) => {
  try {
    const { year, classShiftSection, semester, term, group } = req.query;

    // Strict filtering based on the required form inputs
    let query = { isActive: true };
    
    if (year && year !== '') query.year = year;
    if (classShiftSection && classShiftSection !== '') query.classShiftSection = classShiftSection;
    if (semester && semester !== '') query.semester = semester;
    if (term && term !== '') query.term = term;
    if (group && group !== '') query.group = group;

    const students = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ roll: 1 })
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