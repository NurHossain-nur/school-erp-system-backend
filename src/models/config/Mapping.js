// src/models/config/Mapping.js
import mongoose from 'mongoose';

// ক্লাস-সেকশন ম্যাপিং এর স্কিমা
const classSectionSchema = new mongoose.Schema({
  className: { type: String, required: true },
  shiftName: { type: String, required: true },
  sections: [{ type: String }] // একাধিক সেকশনের নাম থাকবে
});

// 💡 নতুন: Class Wise Group Mapping Schema
const groupMappingItemSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  numberOfRequiredSubject: { type: String, default: "" },
  choosableCompulsorySubjectInstruction: { type: String, default: "" },
  fourthSubjectInstructionForAdmissionForm: { type: String, default: "" }
}, { _id: false });

const classGroupSchema = new mongoose.Schema({
  className: { type: String, required: true },
  groups: [groupMappingItemSchema]
});


// 💡 নতুন: Class Wise Semester Mapping Schema
const semesterMappingItemSchema = new mongoose.Schema({
  semesterName: { type: String, required: true },
  orderNo: { type: String, default: "" }
}, { _id: false });

const classSemesterSchema = new mongoose.Schema({
  year: { type: String, required: true },
  className: { type: String, required: true },
  semesters: [semesterMappingItemSchema]
});


// 💡 নতুন: Class Wise Subject Mapping Schema
const subjectMappingItemSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  isAttendanceApplicable: { type: Boolean, default: false },
  replaceSubName: { type: String, default: "" },
  creditHour: { type: String, default: "0.00" },
  maxAdmissionSeat: { type: String, default: "0" },
  groups: [{ type: String }], // Multi-select array
  subjectType: { type: String, default: "Compulsory" },
  subjectGroup: { type: String, default: "0" },
  isApplicableFor4thSubject: { type: String, default: "No" }
}, { _id: false });

const classSubjectSchema = new mongoose.Schema({
  className: { type: String, required: true },
  semesterName: { type: String, required: true },
  subjects: [subjectMappingItemSchema]
});



// মূল Mapping স্কিমা
const mappingSchema = new mongoose.Schema(
  {
    // এটি একটি অবজেক্ট (অ্যারে) হিসেবে থাকছে, ভবিষ্যতে আরও ম্যাপিং এখানে যোগ হবে
    classSectionMapping: [classSectionSchema],
    classGroupMapping: [classGroupSchema],
    classSemesterMapping: [classSemesterSchema],
    classSubjectMapping: [classSubjectSchema]

    // Future Example:
    // subjectTeacherMapping: [subjectTeacherSchema]
  },
  { timestamps: true }
);

const Mapping = mongoose.model('Mapping', mappingSchema);
export default Mapping;