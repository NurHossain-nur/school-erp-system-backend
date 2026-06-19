// src/models/Shift.js
import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    nameBangla: { type: String, trim: true },
    orderNo: { type: Number, required: [true, 'Order No is required'] },
    flexibleMinuteForLate: { type: Number, required: [true, 'Flexible Minute for Late is required'] },
    flexibleMinuteForAbsent: { type: Number, required: [true, 'Flexible Minute for Absent is required'] },
    loginTime: { type: String, required: [true, 'Login Time is required'] },
    logoutTime: { type: String, required: [true, 'Logout Time is required'] },
    isAutoAbsentSmsEnable: { type: String, enum: ['Yes', 'No'], default: 'No' },
    autoAbsentSmsSendTime: { type: String },
    isAutoPresentSmsEnable: { type: String, enum: ['Yes', 'No'], default: 'No' },
    autoPresentSmsSendTime: { type: String },
    shiftStartTime: { type: String, required: [true, 'Shift Start Time is required'] },
    shiftEndTime: { type: String, required: [true, 'Shift End Time is required'] },
  },
  { timestamps: true }
);

const Shift = mongoose.model('Shift', shiftSchema);
export default Shift;