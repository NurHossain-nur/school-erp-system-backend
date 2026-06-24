// src/models/students/Student.js
import mongoose from 'mongoose';

const studentQualificationSchema = new mongoose.Schema({
  exam: String,
  institute: String,
  board: String,
  group: String,
  rollNo: String,
  regNo: String,
  gpa: String,
  passingYear: String
});

const studentSchema = new mongoose.Schema({
  // Academic Information
  year: { type: String, required: true },
  yearForId: { type: String, required: true },
  roll: { type: String, required: true },
  className: { type: String, required: true },
  classShiftSection: { type: String, required: true }, // Mapped string like "NURSERY-Morning-SHAPLA"
  shift: { type: String },
  section: { type: String },

  semester: { type: String, required: true },
  term: { type: String, required: true },
  group: { type: String, required: true },
  studentId: { type: String, unique: true }, // Serially auto-generated or manual
  processCode: String,
  admittedClass: String,
  studentCategory: { type: String, required: true },

  // 💡 NEW — tracks how the student entered their current class
  admissionType: {
    type: String,
    enum: ['New Admission', 'Migration'],
    default: 'New Admission'
  },
  
  dateOfAdmission: String,
  session: String,
  boardRoll: { type: String, default: "0" },
  registrationNo: { type: String, default: "0" },
  responsibleTeacher: String,

  enrolledSubjects: [{
    subjectName: String,
    subjectType: String, // e.g., "Compulsory", "Optional", "4th Subject"
  }],

  // Personal Information
  name: { type: String, required: true, trim: true }, // English Name
  banglaName: { type: String, required: true },
  arabicName: String,
  shortName: String,
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  fatherName: { type: String, required: true },
  banglaFatherName: { type: String },
  fatherNid: String,
  fatherOccupation: String,
  motherName: { type: String, required: true },
  banglaMotherName: { type: String },
  motherOccupation: String,
  motherNid: String,
  birthCertificateNo: String,
  dateOfBirth: String,
  bloodGroup: String,

  // Contact Information
  guardianName1: String,
  guardianName2: String,
  studentMobile: String,
  email: { type: String, default: "N/A" },
  guardianMobile1: { type: String, required: true },
  guardianMobile2: String,
  fathersMobile: String,
  mothersMobile: String,
  relationship1: String,
  relationship2: String,
  presentAddress: String,
  permanentAddress: String,
  villageEnglish: String,
  villageBangla: String,
  route: String,
  division: String,
  district: String,
  upazila: String,
  postOffice: String,

  vaccineInfo: { type: String, default: "N/A" },

  // Operational Fields
  photo: String, // Cloudinary URL
  fatherPhoto: String,     // 💡 NEW
  motherPhoto: String,     // 💡 NEW
  guardian1Photo: String,  // 💡 NEW
  guardian2Photo: String,  // 💡 NEW
  qualifications: [studentQualificationSchema],
  isActive: { type: Boolean, default: true },
  userCreated: { type: String, default: "Not Exists" } // As per image "Not Exists" label
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;