// src/models/generalSetting/Signature.js
import mongoose from 'mongoose';

const signatureItemSchema = new mongoose.Schema({
  key: { type: String, required: true }, // Unique identifier (e.g., 'admit_card_left')
  title: { type: String, required: true }, // Display name
  level: { type: String, default: "" },
  levelBangla: { type: String, default: "" },
  isUse: { type: String, enum: ['Yes', 'No'], default: 'No' },
  isUseClassTeacherSignature: { type: String, enum: ['Yes', 'No'], default: 'No' },
  upperLevel: { type: String, default: "........................." },
  signatureUrl: { type: String, default: "" } // Cloudinary URL
}, { _id: false });

const signatureSchema = new mongoose.Schema(
  {
    settings: [signatureItemSchema] // Array of all signatures
  },
  { timestamps: true }
);

const Signature = mongoose.model('Signature', signatureSchema);
export default Signature;