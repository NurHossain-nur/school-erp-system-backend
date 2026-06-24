// src/controllers/studentreport/comparisonController.js
import Student from '../../models/students/Student.js';

export const getComparisonReport = async (req, res, next) => {
  try {
    const { year, classShiftSection, studentId } = req.query;
    
    if (!year) return res.status(400).json({ success: false, message: "Year is required" });

    const currYear = year;
    const prevYear = (parseInt(year) - 1).toString();

    // 1. Find Current Year Students
    let currQuery = { year: currYear, isActive: true };
    if (classShiftSection && classShiftSection !== 'All') currQuery.classShiftSection = classShiftSection;
    if (studentId) currQuery.studentId = studentId;

    const currStudents = await Student.find(currQuery)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ classShiftSection: 1, roll: 1 })
      .lean();

    if (currStudents.length === 0) {
      return res.status(200).json({ success: true, data: [], prevYear, currYear });
    }

    // 2. Extract their IDs and fetch their Previous Year records
    const studentIds = currStudents.map(s => s.studentId);
    const prevStudents = await Student.find({ year: prevYear, studentId: { $in: studentIds } }).lean();

    // 3. Merge the data together
    const map = {};
    currStudents.forEach(s => {
      map[s.studentId] = { 
        studentId: s.studentId, 
        name: s.name, 
        curr: s, 
        prev: null 
      };
    });

    prevStudents.forEach(s => {
      if (map[s.studentId]) {
        map[s.studentId].prev = s;
      }
    });

    res.status(200).json({ 
      success: true, 
      count: currStudents.length,
      data: Object.values(map), 
      prevYear, 
      currYear 
    });

  } catch (error) {
    next(error);
  }
};