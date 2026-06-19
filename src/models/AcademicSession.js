// src/models/AcademicSession.js
import mongoose from 'mongoose';

const academicSessionSchema = new mongoose.Schema(
  {
    year: { 
      type: String, 
      required: [true, 'Year is required'],
      trim: true 
    },
    name: { 
      type: String, 
      required: [true, 'Name (Academic Session) is required'],
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

const AcademicSession = mongoose.model('AcademicSession', academicSessionSchema);
export default AcademicSession;