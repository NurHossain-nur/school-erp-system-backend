// src/controllers/examroutine/examRoutineProcessController.js
import Routine from '../../models/examroutine/Routine.js';

const getRoutineDocument = async () => {
  let doc = await Routine.findOne();
  if (!doc) doc = await Routine.create({ examRoutineSession: [], examRoutines: [] });
  return doc;
};

// নির্দিষ্ট Exam এর সব রুটিন নিয়ে আসা
export const getExamRoutinesByExamName = async (req, res, next) => {
  try {
    const { examName, examYear } = req.query;
    const doc = await getRoutineDocument();
    
    let routines = doc.examRoutines;
    if (examName) {
      routines = routines.filter(r => r.examName === examName);
    }
    // Filter by year if provided
    if (examYear) {
      routines = routines.filter(r => r.examYear === examYear);
    }
    res.status(200).json({ success: true, data: routines });
  } catch (error) { next(error); }
};

// রুটিন সেভ করা (Upsert: থাকলে আপডেট, না থাকলে নতুন অ্যাড)
export const saveExamRoutineProcess = async (req, res, next) => {
  try {
    const { examName, examYear, className, groupName, subjects } = req.body;
    const doc = await getRoutineDocument();

    const existingIndex = doc.examRoutines.findIndex(
      r => r.examName === examName && r.examYear === examYear && r.className === className && r.groupName === groupName
    );

    // শুধু সিলেক্ট করা সাবজেক্টগুলোই সেভ হবে
    const activeSubjects = subjects.filter(s => s.isSelected);

    if (existingIndex > -1) {
      doc.examRoutines[existingIndex].subjects = activeSubjects;
    } else {
      doc.examRoutines.push({ examName, examYear, className, groupName, subjects: activeSubjects });
    }

    await doc.save();
    res.status(200).json({ success: true, message: 'Routine Processed & Saved Successfully!' });
  } catch (error) { 
    
    // 👇 ADD THESE TWO LINES 👇
    console.log("🔥 MONGOOSE SAVE ERROR:", error.message);
    // res.status(500).json({ success: false, message: error.message });

    next(error); 
  }
};