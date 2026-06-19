// src/models/Class.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    nameEnglish: { type: String, required: [true, 'Class Name (English) is required'] },
    nameBangla: { type: String, required: [true, 'Class Name (Bangla) is required'] },
    studentIdShortForm: { type: String, required: [true, 'Student ID Short Form is required'] },
    enabledSession: { type: String, enum: ['Yes', 'No'], default: 'No' },
    qualifications: [{ type: String }] // চেকবস থেকে আসা ডাটা সেভ করার জন্য
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classSchema);
export default Class;