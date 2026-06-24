// src/scripts/backfillAdmissionType.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../src/models/students/Student.js';
import connectDB from '../src/config/db.js';

// .env ফাইল লোড করা (যাতে ক্লাউড ডাটাবেস লিংক পায়)
dotenv.config();

const backfillAdmissionType = async () => {
  try {
    // ১. ডাটাবেসে কানেক্ট করা
    await connectDB();

    // ২. যেসব Student ডকুমেন্টে admissionType ফিল্ড নেই, তাদের খুঁজে বের করা
    //    এবং ডিফল্ট ভ্যালু "New Admission" সেট করা
    const result = await Student.updateMany(
      { admissionType: { $exists: false } },
      { $set: { admissionType: 'New Admission' } }
    );

    console.log('✅ Backfill Completed Successfully!');
    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

    process.exit(); // কাজ শেষ, টার্মিনাল বন্ধ করে দেওয়া
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

backfillAdmissionType();