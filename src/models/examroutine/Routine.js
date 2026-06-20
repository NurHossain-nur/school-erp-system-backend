// src/models/examroutine/Routine.js
import mongoose from 'mongoose';

// Exam Routine Session এর স্কিমা
const examRoutineSessionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  routineHeader: { type: String, trim: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

// 💡 নতুন: Processed Exam Routine স্কিমা
const processedRoutineSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  examYear: { type: String },
  className: { type: String, required: true },
  groupName: { type: String, required: true },
  subjects: [{
    subjectName: { type: String },
    date: { type: String },
    session: { type: String },
    roomNo: { type: String },
    isSelected: { type: Boolean, default: true }
  }]
});

// মূল Routine স্কিমা
const routineSchema = new mongoose.Schema(
  {
    examRoutineSession: [examRoutineSessionSchema],
    examRoutines: [processedRoutineSchema]
    // ভবিষ্যতে regularRoutine, classRoutine ইত্যাদি এখানে যুক্ত হবে
  },
  { timestamps: true }
);

const Routine = mongoose.model('Routine', routineSchema);
export default Routine;