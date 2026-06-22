// src/models/teachers/Teacher.js
import mongoose from 'mongoose';

const educationalQualificationSchema = new mongoose.Schema({
  exam: String,
  boardUniversity: String,
  groupDepartment: String,
  result: String,
  passingYear: String
});

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, unique: true }, 
  category: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  banglaName: String,
  shortName: { type: String, required: true },
  order: { type: Number, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  fatherName: String,
  banglaFatherName: String,
  motherName: String,
  banglaMotherName: String,
  religion: { type: String, required: true },
  teacherSection: { type: String, required: true },
  isShowInDashboard: { type: String, default: 'No' },
  faculty: String,
  group: String,
  isDean: { type: String, default: 'No' },
  presentAddress: String,
  permanentAddress: String,
  parentSpouseMobile: String,
  teacherIndexNumber: String,
  payCode: String,
  perDaySalary: { type: Number, default: 0 },
  salaryBankName: String,
  salaryBankAccount: String,
  subject: String,
  dateOfJoining: String,
  dateOfBirth: String,
  bloodGroup: String,
  email: String,
  isPermanent: { type: String, default: 'Permanent' },
  processCode: String,
  nid: String,
  mpoDate: String,
  mpoType: { type: String, default: 'MPO' },
  formerTeacherStaff: { type: String, default: 'No' },
  shift: [String], 
  office: String,
  photo: String,
  qualifications: [educationalQualificationSchema],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;