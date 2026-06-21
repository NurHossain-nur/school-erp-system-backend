// src/models/examroutine/Routine.js
import mongoose from 'mongoose';

// Exam Routine Session এর স্কিমা (এটি আগের মতোই থাকবে)
const examRoutineSessionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  routineHeader: { type: String, trim: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

// মূল Routine (শুধু সেশন বা গ্লোবাল কনফিগারেশনের জন্য)
const routineSchema = new mongoose.Schema(
  {
    examRoutineSession: [examRoutineSessionSchema]
  },
  { timestamps: true }
);

export const Routine = mongoose.model('Routine', routineSchema);

// 🎯 নতুন স্বাধীন মডেল: প্রতিটি রুটিন প্রসেস আলাদা ডকুমেন্ট হিসেবে সেভ হবে
const examRoutineSchema = new mongoose.Schema({
  examName: { type: String, required: true, trim: true },
  examYear: { type: String, required: true },
  className: { type: String, required: true },
  groupName: { type: String, required: true },
  subjects: [{
    subjectName: { type: String },
    date: { type: String },
    session: { type: String },
    roomNo: { type: String },
    isSelected: { type: Boolean, default: true }
  }]
}, { timestamps: true }); // এতে রুটিন কখন তৈরি বা আপডেট হলো তা ট্র্যাক থাকবে

export const ExamRoutine = mongoose.model('ExamRoutine', examRoutineSchema);