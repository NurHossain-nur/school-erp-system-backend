// src/models/students/StudentOffense.js
import mongoose from 'mongoose';

const studentOffenseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  banglaName: { 
    type: String, 
    required: true,
    trim: true 
  },
  orderNo: { 
    type: Number, 
    required: true 
  }
}, { 
  timestamps: true,
  collection: 'studentoffenses' // 💡 Forces Mongoose to use your exact collection name
});

const StudentOffense = mongoose.model('StudentOffense', studentOffenseSchema);
export default StudentOffense;