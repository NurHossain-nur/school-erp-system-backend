// src/models/Institute.js
import mongoose from 'mongoose';

const instituteSchema = new mongoose.Schema(
  {
    nameEnglish: { type: String, required: true },
    nameBangla: { type: String },
    nameArabic: { type: String },
    instituteType: { type: String, default: 'School' },
    instituteId: { type: String },
    eiin: { type: String },
    facebook: { type: String },
    youtube: { type: String },
    website: { type: String },
    email: { type: String },
    mobile: { type: String },
    address1English: { type: String },
    address1Bangla: { type: String },
    address2: { type: String },
    address3: { type: String },
    // ছবিগুলোর জন্য আপাতত স্ট্রিং (URL) রাখছি
    logo: { type: String },
    reportHeaderImage: { type: String },
    marksheetBgImage: { type: String },
  },
  { timestamps: true }
);

const Institute = mongoose.model('Institute', instituteSchema);
export default Institute;