// src/models/StudentCategory.js
import mongoose from 'mongoose';

const studentCategorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      required: [true, 'Bangla Name is required'],
      trim: true
    },
    orderNo: { 
      type: Number, 
      required: [true, 'Order No is required'] 
    },
  },
  { timestamps: true }
);

const StudentCategory = mongoose.model('StudentCategory', studentCategorySchema);
export default StudentCategory;