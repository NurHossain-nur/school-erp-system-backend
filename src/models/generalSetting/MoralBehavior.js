// src/models/generalsetting/MoralBehavior.js
import mongoose from 'mongoose';

const moralBehaviorSchema = new mongoose.Schema(
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
    },
    applicableFor: { 
      type: String, 
      required: [true, 'For field is required'],
      default: "General Marksheet"
    },
    orderNo: { 
      type: Number, 
      required: [true, 'Order No is required'] 
    }
  },
  { timestamps: true }
);

const MoralBehavior = mongoose.model('MoralBehavior', moralBehaviorSchema);
export default MoralBehavior;