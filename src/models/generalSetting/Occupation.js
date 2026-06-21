// src/models/generalSetting/Occupation.js
import mongoose from 'mongoose';

const occupationSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Occupation Name is required'],
      trim: true,
      unique: true // একই পেশা যেন দুবার অ্যাড না হয়
    }
  },
  { timestamps: true }
);

const Occupation = mongoose.model('Occupation', occupationSchema);
export default Occupation;