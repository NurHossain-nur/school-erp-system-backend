// src/models/Faculty.js
import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    nameEnglish: { 
      type: String, 
      required: [true, 'English Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      trim: true
    },
    orderNo: { 
      type: Number, 
      required: [true, 'Order No is required'] 
    },
    status: {
      type: Boolean,
      default: true // ডিফল্টভাবে Active থাকবে
    }
  },
  { timestamps: true }
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;