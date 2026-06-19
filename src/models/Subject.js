// src/models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Subject Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      trim: true
    },
    shortName: {
      type: String,
      required: [true, 'Subject Short Name is required'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
      trim: true
    },
    orderNo: { 
      type: Number, 
      required: [true, 'Order No is required'] 
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;