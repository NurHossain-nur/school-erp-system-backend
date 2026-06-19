// src/controllers/uploadController.js
import multer from 'multer';
import { uploadToCloudinary } from '../config/cloudinary.js';

// Multer Memory Storage Configuration
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage });

// Image Upload Controller
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // 💡 আমাদের নতুন Reusable ফাংশনটি কল করছি
    // আপনি চাইলে ফোল্ডারের নাম ডায়নামিকালিও পাস করতে পারেন (যেমন: 'erp_signatures')
    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype, 'erp_signatures');

    // সফলভাবে আপলোড হলে URL রিটার্ন করা হচ্ছে
    res.status(200).json({ 
      success: true, 
      url: result.secure_url,
      public_id: result.public_id // ভবিষ্যতে ছবি ডিলিট করার জন্য এটি কাজে লাগতে পারে
    });
  } catch (error) { 
    console.error("Upload Error:", error);
    next(error); 
  }
};