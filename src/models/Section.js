// src/models/Section.js
import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
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
  },
  { timestamps: true }
);

const Section = mongoose.model('Section', sectionSchema);
export default Section;