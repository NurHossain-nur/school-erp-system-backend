// src/models/generalsetting/CoCurricular.js
import mongoose from 'mongoose';

const coCurricularSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
    banglaName: { 
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

const CoCurricular = mongoose.model('CoCurricular', coCurricularSchema);
export default CoCurricular;