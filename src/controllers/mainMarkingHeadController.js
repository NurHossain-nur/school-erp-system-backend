// src/controllers/mainMarkingHeadController.js
import MainMarkingHead from '../models/MainMarkingHead.js';

export const getMarkingHeads = async (req, res, next) => {
  try {
    const heads = await MainMarkingHead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: heads });
  } catch (error) { next(error); }
};

export const getMarkingHeadById = async (req, res, next) => {
  try {
    const head = await MainMarkingHead.findById(req.params.id);
    if (!head) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: head });
  } catch (error) { next(error); }
};

export const createMarkingHead = async (req, res, next) => {
  try {
    const exists = await MainMarkingHead.findOne({ className: req.body.className, year: req.body.year });
    if (exists) return res.status(400).json({ success: false, message: 'Setup for this class and year already exists' });
    
    const newHead = await MainMarkingHead.create(req.body);
    res.status(201).json({ success: true, message: 'Added successfully', data: newHead });
  } catch (error) { next(error); }
};

export const updateMarkingHead = async (req, res, next) => {
  try {
    const head = await MainMarkingHead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!head) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Updated successfully', data: head });
  } catch (error) { next(error); }
};

// 💡 স্পেশাল কপি ফাংশন
export const copyMarkingHead = async (req, res, next) => {
  try {
    const sourceHead = await MainMarkingHead.findById(req.params.id);
    if (!sourceHead) return res.status(404).json({ success: false, message: 'Source not found' });

    const { targetYear, targetClass } = req.body;

    // টার্গেটে অলরেডি থাকলে আপডেট হবে, না থাকলে নতুন তৈরি হবে
    let existing = await MainMarkingHead.findOne({ className: targetClass, year: targetYear });
    if (existing) {
      existing.heads = sourceHead.heads;
      await existing.save();
    } else {
      await MainMarkingHead.create({ className: targetClass, year: targetYear, heads: sourceHead.heads });
    }

    res.status(200).json({ success: true, message: 'Marking Head copied successfully!' });
  } catch (error) { next(error); }
};