// src/controllers/examroutine/examRoutineProcessController.js
import { ExamRoutine } from '../../models/examroutine/Routine.js';

// নির্দিষ্ট Exam এবং Year এর সব রুটিন নিয়ে আসা
export const getExamRoutinesByExamName = async (req, res, next) => {
  try {
    const { examName, examYear } = req.query;
    
    // মঙ্গোডিবি কোয়েরি অবজেক্ট তৈরি
    const query = {};
    if (examName) query.examName = examName;
    if (examYear) query.examYear = examYear;

    // সরাসরি ডাটাবেস থেকে ফিল্টারড ডাটা চলে আসবে, কোনো ম্যানুয়াল .filter() লাগবে না
    const routines = await ExamRoutine.find(query).lean();
    
    res.status(200).json({ success: true, data: routines });
  } catch (error) { 
    next(error); 
  }
};

// রুটিন সেভ করা (Upsert: থাকলে আপডেট, না থাকলে নতুন ডকুমেন্ট তৈরি)
export const saveExamRoutineProcess = async (req, res, next) => {
  try {
    const { examName, examYear, className, groupName, subjects } = req.body;

    // শুধু সিলেক্ট করা সাবজেক্টগুলোই ফিল্টার করা হচ্ছে
    const activeSubjects = subjects.filter(s => s.isSelected);

    // 🎯 ডাটাবেস লেভেলে সরাসরি আপসার্ট (Upsert) লজিক
    const updatedRoutine = await ExamRoutine.findOneAndUpdate(
      { 
        examName, 
        examYear, 
        className, 
        groupName 
      }, // এই ৪টি জিনিস মিললে আপডেট হবে
      { 
        $set: { subjects: activeSubjects } 
      }, // শুধু সাবজেক্ট অ্যারেটি রিপ্লেস হবে
      { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true 
      } // না থাকলে নতুন ডকুমেন্ট তৈরি হবে
    );

    res.status(200).json({ 
      success: true, 
      message: 'Routine Processed & Saved Successfully!',
      data: updatedRoutine 
    });
  } catch (error) { 
    console.log("🔥 MONGOOSE SAVE ERROR:", error.message);
    next(error); 
  }
};





// নির্দিষ্ট Exam এবং Year এর সম্পূর্ণ রুটিন ডিলিট করা
export const deleteExamRoutineProcess = async (req, res, next) => {
  try {
    const { examName, examYear } = req.query;

    if (!examName || !examYear) {
      return res.status(400).json({ success: false, message: "examName and examYear are required parameters." });
    }

    // নির্দিষ্ট পরীক্ষা ও বছরের সব রুটিন ডকুমেন্ট ডিলিট করবে
    const result = await ExamRoutine.deleteMany({ examName, examYear });

    res.status(200).json({ 
      success: true, 
      message: `Successfully deleted ${result.deletedCount} routine records for ${examName} (${examYear}).`
    });
  } catch (error) {
    next(error);
  }
};