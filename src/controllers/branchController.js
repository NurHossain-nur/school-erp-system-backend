// src/controllers/branchController.js
import Branch from '../models/Branch.js';

// @desc    Get all branches
// @route   GET /api/v1/branches
export const getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: branches });
  } catch (error) { next(error); }
};

// @desc    Get single branch
// @route   GET /api/v1/branches/:id
export const getBranchById = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, data: branch });
  } catch (error) { next(error); }
};

// @desc    Create new branch
// @route   POST /api/v1/branches
export const createBranch = async (req, res, next) => {
  try {
    // কোড ডুপ্লিকেট আছে কি না চেক করা
    const existingCode = await Branch.findOne({ code: req.body.code });
    if (existingCode) {
      return res.status(400).json({ success: false, message: 'Branch Code already exists' });
    }

    const branch = await Branch.create(req.body);
    res.status(201).json({ success: true, message: 'Branch added successfully', data: branch });
  } catch (error) { next(error); }
};

// @desc    Update branch
// @route   PUT /api/v1/branches/:id
export const updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, message: 'Branch updated successfully', data: branch });
  } catch (error) { next(error); }
};

// @desc    Delete branch
// @route   DELETE /api/v1/branches/:id
export const deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, message: 'Branch deleted successfully' });
  } catch (error) { next(error); }
};