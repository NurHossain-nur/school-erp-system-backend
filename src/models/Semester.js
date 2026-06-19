// src/models/Semester.js
import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema(
  {
    nameEnglish: { 
      type: String, 
      required: [true, 'English Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      required: [true, 'Bangla Name is required'],
      trim: true
    },
    level: { 
      type: Number, 
      required: [true, 'Level is required'] 
    },
  },
  { timestamps: true }
);

const Semester = mongoose.model('Semester', semesterSchema);
export default Semester;