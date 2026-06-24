// src/controllers/studentreport/studentReportController.js
import Student from '../../models/students/Student.js';

export const getStudentReport = async (req, res, next) => {
  try {
    const { 
      year, roll, nameOrId, className, shift, section, semester, term, 
      group, religion, bloodGroup, studentCategory, fatherOccupation, 
      motherOccupation, status, division, district, upazila, postOffice, 
      villageName, route, gender, multipleRoll, fromRoll, toRoll, happyBirthday 
    } = req.query;

    let query = {};

    // Standard Dropdown & Text Filters
    if (year) query.year = year;
    if (className && className !== 'All') query.className = className;
    if (shift && shift !== 'All') query.shift = shift;
    if (section && section !== 'All') query.section = section;
    if (semester && semester !== 'All') query.semester = semester;
    if (term && term !== 'All') query.term = term;
    if (group && group !== 'All') query.group = group;
    if (religion && religion !== 'All') query.religion = religion;
    if (bloodGroup && bloodGroup !== 'All') query.bloodGroup = bloodGroup;
    if (studentCategory && studentCategory !== 'All') query.studentCategory = studentCategory;
    if (fatherOccupation && fatherOccupation !== 'All') query.fatherOccupation = fatherOccupation;
    if (motherOccupation && motherOccupation !== 'All') query.motherOccupation = motherOccupation;
    if (division && division !== 'All') query.division = division;
    if (district && district !== 'All') query.district = district;
    if (upazila && upazila !== 'All') query.upazila = upazila;
    if (postOffice && postOffice !== 'All') query.postOffice = new RegExp(postOffice, 'i');
    if (gender && gender !== 'All') query.gender = gender;
    
    // Partial Text Matches
    if (villageName) query.villageEnglish = new RegExp(villageName, 'i');
    if (route) query.route = new RegExp(route, 'i');
    if (status && status !== 'All') query.isActive = status === 'Active';
    
    if (nameOrId) {
      query.$or = [
        { name: new RegExp(nameOrId, 'i') },
        { studentId: new RegExp(nameOrId, 'i') }
      ];
    }

    // Roll Number Filtering
    if (multipleRoll) {
      const rollsArray = multipleRoll.split(',').map(r => r.trim());
      query.roll = { $in: rollsArray };
    } else if (fromRoll || toRoll) {
      query.roll = {};
      if (fromRoll) query.roll.$gte = fromRoll;
      if (toRoll) query.roll.$lte = toRoll;
    } else if (roll) {
      query.roll = roll;
    }

    // Happy Birthday Filter
    if (happyBirthday && happyBirthday !== 'All') {
      const today = new Date();
      const currentMonth = `-${String(today.getMonth() + 1).padStart(2, '0')}-`;
      const currentDate = `-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      if (happyBirthday === 'Today') {
        query.dateOfBirth = new RegExp(currentDate + '$');
      } else if (happyBirthday === 'This Month') {
        query.dateOfBirth = new RegExp(currentMonth);
      }
    }

    // Execute query
    const reportData = await Student.find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort({ roll: 1 });

    res.status(200).json({ success: true, count: reportData.length, data: reportData });

  } catch (error) {
    next(error);
  }
};