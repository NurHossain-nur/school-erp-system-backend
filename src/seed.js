// src/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

// .env ফাইল লোড করা (যাতে ক্লাউড ডাটাবেস লিংক পায়)
dotenv.config();

const createAdmin = async () => {
  try {
    // ১. ডাটাবেসে কানেক্ট করা
    await connectDB();

    // ২. আগের কোনো ডামি ডেটা থাকলে মুছে ফেলা (ঐচ্ছিক)
    // await User.deleteMany(); 

    // ৩. নতুন অ্যাডমিন তৈরি করা
    const adminUser = new User({
      name: 'Nibir Chandra Roy',
      username: '01845945482', // এটি আপনার আইডি/ইউজারনেম
      password: 'password123', // এটি অটোমেটিক হ্যাশ হয়ে যাবে!
      role: 'Super Admin',
      status: 'Active',
    });

    // ৪. সেভ করা
    await adminUser.save();

    console.log('✅ Super Admin Created Successfully!');
    console.log('Username: 01845945482');
    console.log('Password: password123');
    
    process.exit(); // কাজ শেষ, টার্মিনাল বন্ধ করে দেওয়া
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();