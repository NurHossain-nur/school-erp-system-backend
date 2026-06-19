// src/controllers/instituteController.js
import Institute from '../models/Institute.js';

// @desc    Get Institute Information
// @route   GET /api/v1/institute
export const getInstitute = async (req, res, next) => {
  try {
    // যেহেতু স্কুলের ডেটা একটাই হবে, তাই findOne() দিয়ে প্রথম ডেটাটি আনছি
    const institute = await Institute.findOne();
    res.status(200).json({ success: true, data: institute || {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or Update Institute Information (Upsert)
// @route   PUT /api/v1/institute
export const upsertInstitute = async (req, res, next) => {
  try {
    // ডাটাবেসে আগে থেকে কোনো ডেটা আছে কি না চেক করা
    let institute = await Institute.findOne();

    if (institute) {
      // যদি থাকে, তবে আপডেট করবে
      Object.assign(institute, req.body);
      await institute.save();
    } else {
      // যদি না থাকে, তবে নতুন তৈরি করবে
      institute = await Institute.create(req.body);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Institute information saved successfully', 
      data: institute 
    });
  } catch (error) {
    next(error);
  }
};