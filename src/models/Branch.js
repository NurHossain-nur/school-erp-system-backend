// src/models/Branch.js
import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    code: { type: String, required: [true, 'Branch Code is required'] },
    nameEnglish: { type: String, required: [true, 'Branch Name (English) is required'] },
    nameBangla: { type: String, required: [true, 'Branch Name (Bangla) is required'] },
    mobile: { type: String, required: [true, 'Mobile number is required'] },
    email: { type: String },
    concernPerson: { type: String },
    concernPersonMobile: { type: String },
    address: { type: String, required: [true, 'Address is required'] },
  },
  { timestamps: true }
);

const Branch = mongoose.model('Branch', branchSchema);
export default Branch;