// server.js
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

// .env ফাইল লোড করা
dotenv.config();

// Uncaught Exceptions হ্যান্ডেল করা (সিঙ্ক্রোনাস কোডে কোনো বাগ থাকলে)
process.on('uncaughtException', (err) => {
  console.log('❌ UNCAUGHT EXCEPTION! Shutting down server...');
  console.log(err.name, err.message);
  process.exit(1);
});

// ডাটাবেস কানেকশন কল করা
connectDB();

const PORT = process.env.PORT || 5000;

// সার্ভার স্টার্ট করা
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Unhandled Rejections হ্যান্ডেল করা (অ্যাসিঙ্ক্রোনাস কোড বা ডাটাবেস ফেইল করলে)
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Shutting down server gracefully...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});