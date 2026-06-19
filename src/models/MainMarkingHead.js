// src/models/MainMarkingHead.js
import mongoose from 'mongoose';

const headItemSchema = new mongoose.Schema(
  {
    english: { type: String, default: '0', trim: true },
    bangla: { type: String, default: '0', trim: true }
  }, 
  { _id: false } // সাব-ডকুমেন্টের আলাদা ID দরকার নেই
);

const mainMarkingHeadSchema = new mongoose.Schema(
  {
    className: { 
      type: String, 
      required: [true, 'Class name is required'],
      trim: true 
    },
    year: { 
      type: String, 
      required: [true, 'Year is required'],
      default: '2026'
    },
    heads: {
      type: [headItemSchema],
      default: () => Array(7).fill({ english: '0', bangla: '0' })
    }
  },
  { timestamps: true }
);

// একই ক্লাস এবং বছরের জন্য যেন ডুপ্লিকেট এন্ট্রি না হয়
mainMarkingHeadSchema.index({ className: 1, year: 1 }, { unique: true });

const MainMarkingHead = mongoose.model('MainMarkingHead', mainMarkingHeadSchema);
export default MainMarkingHead;