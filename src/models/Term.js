// src/models/Term.js
import mongoose from 'mongoose';

const termSchema = new mongoose.Schema(
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
    currentTerm: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'No',
      required: [true, 'Current Term is required']
    },
    isActive: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'Yes',
      required: [true, 'Is Active is required']
    }
  },
  { timestamps: true }
);

const Term = mongoose.model('Term', termSchema);
export default Term;