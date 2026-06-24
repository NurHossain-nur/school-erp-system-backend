// src/controllers/studentreport/studentSummaryController.js
import Student from '../../models/students/Student.js';

export const getStudentSummary = async (req, res, next) => {
  try {
    const { year, term, gender } = req.query;
    
    // We only want to summarize active students
    let query = { isActive: true };
    
    if (year) query.year = year;
    if (term) query.term = term;
    if (gender && gender !== '--All--') query.gender = gender;

    // Fetch and logically sort data
    const students = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ className: 1, section: 1, roll: 1 })
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