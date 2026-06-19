// src/controllers/groupController.js
import Group from '../models/Group.js';

// @desc    Get all groups (With Search)
// @route   GET /api/v1/groups
export const getGroups = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const groups = await Group.find(query).sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: groups });
  } catch (error) { next(error); }
};

// @desc    Get single group
// @route   GET /api/v1/groups/:id
export const getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
    res.status(200).json({ success: true, data: group });
  } catch (error) { next(error); }
};

// @desc    Create new group
// @route   POST /api/v1/groups
export const createGroup = async (req, res, next) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json({ success: true, message: 'Group added successfully', data: group });
  } catch (error) { next(error); }
};

// @desc    Update group
// @route   PUT /api/v1/groups/:id
export const updateGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
    res.status(200).json({ success: true, message: 'Group updated successfully', data: group });
  } catch (error) { next(error); }
};

// @desc    Delete group
// @route   DELETE /api/v1/groups/:id
export const deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
    res.status(200).json({ success: true, message: 'Group deleted successfully' });
  } catch (error) { next(error); }
};