// src/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'; // 💡 এটি ইম্পোর্ট করুন

dotenv.config(); // 💡 Cloudinary কনফিগার করার আগেই এটি কল করে দিন!

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); // এটি undefined দেখালে বুঝবেন dotenv কাজ করছে না

// Environment variables থেকে কনফিগারেশন নেওয়া হচ্ছে
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Reusable Helper Function for Uploading Images to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {String} mimetype - The mimetype of the file (e.g., 'image/jpeg')
 * @param {String} folderName - The target folder name in Cloudinary
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = async (fileBuffer, mimetype, folderName = 'erp_uploads') => {
  try {
    // Buffer থেকে Base64 Data URI তৈরি করা
    const b64 = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:${mimetype};base64,${b64}`;

    // Cloudinary-তে আপলোড করা
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folderName,
    });

    return result;
  } catch (error) {
    throw new Error(`Cloudinary Upload Failed: ${error.message}`);
  }
};

export default cloudinary;