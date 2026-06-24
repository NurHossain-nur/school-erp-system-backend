// src/models/students/DisciplinaryAction.js
import mongoose from 'mongoose';

const disciplinaryActionSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  offenseType: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StudentOffense', 
    required: true 
  },
  year: { type: String, required: true },
  classShiftSection: { type: String, required: true },
  group: { type: String },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  file: { type: String }, // URL from Cloudinary upload
  remarks: { type: String } // HTML from Rich Text Editor
}, { 
  timestamps: true,
  collection: 'disciplinaryactions'
});

const DisciplinaryAction = mongoose.model('DisciplinaryAction', disciplinaryActionSchema);
export default DisciplinaryAction;