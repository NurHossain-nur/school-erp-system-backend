// src/models/teacherspreset/TeacherPreset.js
import mongoose from 'mongoose';

// Teacher Section এর সাব-স্কিমা
const teacherSectionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Teacher Section Name is required'], 
    trim: true 
  }
});

// Teacher Designation এর সাব-স্কিমা
const teacherDesignationSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  banglaName: { type: String, trim: true, default: "" },
  numberOfDesignation: { type: String, default: "" },
  sortingOrder: { type: Number, default: 0 },
  isTeacherDesignation: { type: String, enum: ['Yes', 'No'], default: 'Yes' }
});

// Teacher Pay Code এর সাব-স্কিমা
const teacherPayCodeSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Pay Code is required'], trim: true }
});

// Teacher Educational Qualification এর সাব-স্কিমা
const teacherQualificationSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Education Qualification is required'], trim: true },
  banglaName: { type: String, trim: true, default: "" },
  isActiveForAdmission: { type: String, enum: ['Yes', 'No'], default: 'Yes' }
});



// মূল TeacherPreset স্কিমা
const teacherPresetSchema = new mongoose.Schema(
  {
    teacherSection: [teacherSectionSchema],
    teacherDesignation: [teacherDesignationSchema],
    teacherPayCode: [teacherPayCodeSchema],
    teacherQualification: [teacherQualificationSchema]
    // ভবিষ্যতে অন্যান্য প্রিসেট (যেমন: designation, shift ইত্যাদি) এখানে যুক্ত হবে
  },
  { timestamps: true }
);

const TeacherPreset = mongoose.model('TeacherPreset', teacherPresetSchema);
export default TeacherPreset;