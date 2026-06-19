// src/models/GradePoint.js
import mongoose from 'mongoose';

const gradeRuleSchema = new mongoose.Schema(
  {
    startRange: { type: Number, required: true },
    endRange: { type: Number, required: true },
    grade: { type: String, required: true, trim: true },
    gradePoint: { type: Number, required: true },
    comments: { type: String, trim: true },
    isShowInMarksheet: { type: String, enum: ['Yes', 'No'], default: 'Yes' }
  }, 
  { _id: false }
);

const gradePointSchema = new mongoose.Schema(
  {
    className: { 
      type: String, 
      required: [true, 'Class name is required'],
      unique: true, // এক ক্লাসের জন্য একটাই কনফিগারেশন থাকবে
      trim: true 
    },
    grades: [gradeRuleSchema]
  },
  { timestamps: true }
);

const GradePoint = mongoose.model('GradePoint', gradePointSchema);
export default GradePoint;