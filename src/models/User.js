// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    mobile: { type: String, required: true },
    role: { type: String, required: true },
    softwareCurrentYear: { type: String, required: true },
    systemYearChangeable: { type: String, required: true },
    picture: { type: String }, // আপাতত স্ট্রিং (URL/Path)
    showDisciplinaryAction: { type: String, required: true },
    orderNo: { type: Number, required: true },
    teacherStaff: { type: String },
    
    // Dashboard Permissions
    permissions: {
      todaysIncome: { type: Boolean, default: false },
      todaysExpense: { type: Boolean, default: false },
      monthlyIncome: { type: Boolean, default: false },
      monthlyExpense: { type: Boolean, default: false },
      incomeVsExpense: { type: Boolean, default: false },
      last7DaysCollection: { type: Boolean, default: false },
      last10Receipt: { type: Boolean, default: false },
    },
    
    canProvideFeesDiscount: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    pin: { type: String, select: false },
  },
  { timestamps: true }
);

// Password & PIN Hash Logic
userSchema.pre('save', async function () { 
  // 💡 এখান থেকে next প্যারামিটারটি সরিয়ে দিয়েছি
  
  // পাসওয়ার্ড পরিবর্তন হলে বা নতুন তৈরি হলে হ্যাশ করবে
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  // পিন পরিবর্তন বা নতুন জেনারেট হলে হ্যাশ করবে
  if (this.isModified('pin') && this.pin) {
    const salt = await bcrypt.genSalt(10);
    this.pin = await bcrypt.hash(this.pin, salt);
  }
});

// লগইনের সময় পাসওয়ার্ড অথবা পিন চেক করার মেথড (এটি আগের মতোই থাকবে)
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password);
  
  let isPinMatch = false;
  if (this.pin) {
    isPinMatch = await bcrypt.compare(enteredPassword, this.pin);
  }
  
  return isPasswordMatch || isPinMatch;
};

// লগইনের সময় পাসওয়ার্ড অথবা পিন চেক করার মেথড
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password);
  
  let isPinMatch = false;
  if (this.pin) {
    isPinMatch = await bcrypt.compare(enteredPassword, this.pin);
  }
  
  // পাসওয়ার্ড অথবা পিন যেকোনো একটা মিললেই ট্রু রিটার্ন করবে
  return isPasswordMatch || isPinMatch;
};

const User = mongoose.model('User', userSchema);
export default User;