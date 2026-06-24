// src/controllers/students/studentController.js
import Student from '../../models/students/Student.js';

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) { next(error); }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (error) { next(error); }
};

export const createStudent = async (req, res, next) => {
  try {
    let studentData = { ...req.body };

    // 💡 Student ID Auto-generation Logic as per image (e.g., 2601046)
    if (!studentData.studentId || studentData.studentId.trim() === '') {
      const yearPrefix = studentData.yearForId ? studentData.yearForId.toString().slice(-2) : '26';
      
      // এই বছরের লাস্ট আইডি খুঁজছে
      const lastStudent = await Student.findOne({ studentId: new RegExp(`^${yearPrefix}`) })
        .sort({ studentId: -1 })
        .collation({ locale: "en_US", numericOrdering: true });

      let nextSerial = 10001; // ডিফল্ট স্টার্টিং সিরিয়াল
      if (lastStudent && lastStudent.studentId) {
        const currentSerial = parseInt(lastStudent.studentId.slice(2));
        if (!isNaN(currentSerial)) {
          nextSerial = Math.max(10001, currentSerial + 1);
        }
      }
      studentData.studentId = `${yearPrefix}${nextSerial}`;
    } else {
      const existing = await Student.findOne({ studentId: studentData.studentId });
      if (existing) return res.status(400).json({ success: false, message: 'Student ID already exists' });
    }

    const newStudent = await Student.create(studentData);
    res.status(201).json({ success: true, message: 'Admission completed successfully', data: newStudent });
  } catch (error) { next(error); }
};

export const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, message: 'Student data updated successfully', data: updatedStudent });
  } catch (error) { next(error); }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, message: 'Student record deleted successfully' });
  } catch (error) { next(error); }
};






// src/controllers/students/studentController.js

export const createBulkStudents = async (req, res, next) => {
  try {
    const { commonSettings, students } = req.body;
    
    // Determine Year Prefix for ID Generation
    const yearPrefix = commonSettings.yearForId ? commonSettings.yearForId.toString().slice(-2) : '26';

    // Find the last ID in the database for this year
    const lastStudent = await Student.findOne({ studentId: new RegExp(`^${yearPrefix}`) })
      .sort({ studentId: -1 })
      .collation({ locale: "en_US", numericOrdering: true });

    let nextSerial = 10001; // Force 5-digit serial (7 digits total)
    
    if (lastStudent && lastStudent.studentId) {
      const currentSerial = parseInt(lastStudent.studentId.slice(2));
      if (!isNaN(currentSerial)) {
        // 💡 THE MAGIC FIX: Take whichever is BIGGER!
        // If current is 1173, it jumps to 10001. If current is 10005, it goes to 10006.
        nextSerial = Math.max(10001, currentSerial + 1); 
      }
    }

    // Process and merge each student row
    const processedStudents = students.map((stu, index) => {
      const merged = { ...commonSettings, ...stu };

      // 💡 FIX 1: Delete the frontend React 'id' so it doesn't confuse MongoDB's '_id'
      delete merged.id;

      // Auto-generate Student ID if left blank
      if (!merged.studentId || merged.studentId.trim() === '') {
        merged.studentId = `${yearPrefix}${nextSerial + index}`;
      }

      // Map 'mobile' to the required 'guardianMobile1' schema field
      merged.guardianMobile1 = stu.mobile || "N/A";
      
      // 💡 FIX 2: BULLETPROOF FALLBACKS
      // If you test the UI and leave a box blank, Mongoose will crash because these are required.
      // This ensures Mongoose always gets a string!
      merged.name = merged.name || "Unknown";
      merged.banglaName = merged.banglaName || "Unknown";
      merged.fatherName = merged.fatherName || "N/A";
      merged.banglaFatherName = merged.banglaFatherName || "N/A";
      merged.motherName = merged.motherName || "N/A";
      merged.banglaMotherName = merged.banglaMotherName || "N/A";
      merged.gender = merged.gender || "Male"; 
      merged.religion = merged.religion || "Islam"; 
      
      return merged;
    });

    // Bulk Insert into MongoDB
    await Student.insertMany(processedStudents);

    res.status(201).json({ 
      success: true, 
      message: `${processedStudents.length} Students Admitted Successfully!` 
    });

  } catch (error) { 
    // 💡 FIX 3: Print the exact error to the terminal so we can see what Mongoose is complaining about!
    console.error("Bulk Insert Error:", error); 
    res.status(500).json({ success: false, message: error.message || "Bulk admission failed" });
  }
};



export const getMaxRoll = async (req, res, next) => {
  try {
    const { classShiftSection } = req.query;
    if (!classShiftSection) return res.status(400).json({ maxRoll: 0 });

    const student = await Student.findOne({ classShiftSection })
      .sort({ roll: -1 }) // Sort by highest roll
      .collation({ locale: "en_US", numericOrdering: true }); // Ensures "10" is higher than "9"

    const maxRoll = student && student.roll ? parseInt(student.roll) : 0;
    
    res.status(200).json({ success: true, maxRoll });
  } catch (error) { 
    next(error); 
  }
};



// src/controllers/students/studentController.js

export const bulkUpdatePhotos = async (req, res, next) => {
  try {
    const { updates, photoType } = req.body; 
    
    if (!updates || updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No photo updates provided' });
    }

    // 💡 MAP THE DROPDOWN VALUE TO THE EXACT DATABASE FIELD
    const fieldMap = {
      "Student Photo": "photo",
      "Father's Photo": "fatherPhoto",
      "Mother's Photo": "motherPhoto",
      "Guardian Photo (1)": "guardian1Photo",
      "Guardian Photo (2)": "guardian2Photo"
    };

    const targetField = fieldMap[photoType] || "photo";

    // Prepare bulk operations dynamically
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: { [targetField]: update.photoUrl } // 💡 Dynamic key updates the correct field!
      }
    }));

    // Execute bulk write
    await Student.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `${updates.length} ${photoType}s updated successfully!` 
    });

  } catch (error) { 
    next(error); 
  }
};





// src/controllers/students/studentController.js

export const bulkUpdateGeneral = async (req, res, next) => {
  try {
    const { updates } = req.body; // Expects an array: [{ _id: '...', name: '...', roll: '...' }]
    
    if (!updates || updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No updates provided' });
    }

    // Prepare dynamic bulk operations
    const bulkOps = updates.map(update => {
      const { _id, ...fieldsToUpdate } = update;
      
      // If classShiftSection is updated, make sure we also extract and update className, shift, section
      if (fieldsToUpdate.classShiftSection) {
        const parts = fieldsToUpdate.classShiftSection.split('-');
        fieldsToUpdate.section = parts.pop();
        fieldsToUpdate.shift = parts.pop();
        fieldsToUpdate.className = parts.join('-');
      }

      return {
        updateOne: {
          filter: { _id },
          update: { $set: fieldsToUpdate }
        }
      };
    });

    await Student.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `${updates.length} student records updated successfully!` 
    });

  } catch (error) { 
    next(error); 
  }
};

export const bulkDeleteStudents = async (req, res, next) => {
  try {
    const { ids } = req.body; // Expects an array of _ids
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No IDs provided for deletion' });
    }

    await Student.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ 
      success: true, 
      message: `${ids.length} students deleted successfully!` 
    });
  } catch (error) {
    next(error);
  }
};




export const updateProcessCodes = async (req, res, next) => {
  try {
    const { classShiftSection, semester, group, studentCategory, digitCount, processFor } = req.body;

    // Validate required fields
    if (!classShiftSection || !semester || !digitCount || !processFor) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Build the query dynamically
    const query = { classShiftSection, semester };
    
    if (group) query.group = group;
    if (studentCategory) query.studentCategory = studentCategory;

    // If "Only Empty Students", filter out students who already have a code
    if (processFor === 'Only Empty Students') {
      query.$or = [
        { processCode: { $exists: false } }, 
        { processCode: null }, 
        { processCode: '' }
      ];
    }

    // Find matching students
    const students = await Student.find(query);

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'No students found matching the criteria.' });
    }

    // Prepare bulk operations
    const bulkOps = students.map(student => {
      const sid = student.studentId || "";
      // Extract N digits from the right (e.g., if ID="2601046" and digitCount=4, result="1046")
      const newProcessCode = sid.slice(-parseInt(digitCount));

      return {
        updateOne: {
          filter: { _id: student._id },
          update: { $set: { processCode: newProcessCode } }
        }
      };
    });

    // Execute bulk write
    await Student.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `Successfully updated Process Codes for ${students.length} students!` 
    });

  } catch (error) { 
    next(error); 
  }
};





export const migrateStudents = async (req, res, next) => {
  try {
    const { 
      fromYear, toYear, rollSetting, exam, fromClassShiftSection, fromSemester, fromTerm, group,
      toClassShiftSection, toSemester, toTerm, onlyRollSectionUpdate
    } = req.body;

    if (!fromYear || !fromClassShiftSection || !fromSemester || !toClassShiftSection || !rollSetting) {
      return res.status(400).json({ success: false, message: 'Missing required From/To fields.' });
    }

    const query = { 
      year: fromYear, 
      classShiftSection: fromClassShiftSection, 
      semester: fromSemester 
    };
    
    if (fromTerm) query.term = fromTerm;
    if (group && group !== 'All') query.group = group;
    query.isActive = true; 

    // Fetch students. Currently sorting by their EXISTING roll.
    // 🚀 FUTURE EXAM UPDATE: 
    // If exam !== 'Not Applicable', we will fetch their exam results here and sort this `students` array by their Total Marks instead of their old roll!
    let students = await Student.find(query).collation({ locale: "en_US", numericOrdering: true }).sort({ roll: 1 });

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'No active students found matching the criteria.' });
    }

    const parts = toClassShiftSection.split('-');
    const toSection = parts.pop();
    const toShift = parts.pop();
    const toClassName = parts.join('-');

    const bulkOps = students.map((student, index) => {
      let updatedFields = {
        classShiftSection: toClassShiftSection,
        className: toClassName,
        shift: toShift,
        section: toSection
      };

      // 💡 NEW ROLL SETTING LOGIC
      if (["Class Position", "Shift Position", "Section Position", "Group Position"].includes(rollSetting)) {
        // Because they are sorted above (eventually by exam marks), we just assign 1, 2, 3...
        updatedFields.roll = String(index + 1);
      } 
      // If "Previous Year Same Roll", we don't touch updatedFields.roll, keeping it the same!

      if (onlyRollSectionUpdate === "No") {
        if (toYear) updatedFields.year = toYear;
        if (toSemester) updatedFields.semester = toSemester;
        if (toTerm) updatedFields.term = toTerm;
      }

      return {
        updateOne: {
          filter: { _id: student._id },
          update: { $set: updatedFields }
        }
      };
    });

    await Student.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `Successfully migrated ${students.length} students!` 
    });

  } catch (error) { 
    next(error); 
  }
};



// src/controllers/students/studentController.js

export const migrateSemester = async (req, res, next) => {
  try {
    const { 
      year, classShiftSection, fromSemester, fromTerm, group,
      toSemester, toTerm, subjectMigration
    } = req.body;

    // 1. Validate required fields
    if (!year || !classShiftSection || !fromSemester || !toSemester) {
      return res.status(400).json({ success: false, message: 'Missing required From/To fields.' });
    }

    // 2. Build the query to find the current batch of students
    const query = { 
      year: year, 
      classShiftSection: classShiftSection, 
      semester: fromSemester,
      isActive: true // Only migrate active students
    };
    
    if (fromTerm) query.term = fromTerm;
    if (group && group !== 'All') query.group = group;

    // 3. Fetch the students
    const students = await Student.find(query);

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'No active students found matching the criteria.' });
    }

    // 4. Prepare bulk operations
    const bulkOps = students.map((student) => {
      let updatedFields = {
        semester: toSemester
      };

      if (toTerm) updatedFields.term = toTerm;

      // 💡 SUBJECT MIGRATION LOGIC
      // If "Yes", we clear their old semester subjects so the system knows they need the new syllabus assigned.
      if (subjectMigration === "Yes") {
        updatedFields.enrolledSubjects = []; 
      }

      return {
        updateOne: {
          filter: { _id: student._id },
          update: { $set: updatedFields }
        }
      };
    });

    // 5. Execute bulk write
    await Student.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `Successfully migrated ${students.length} students to the new semester!` 
    });

  } catch (error) { 
    next(error); 
  }
};