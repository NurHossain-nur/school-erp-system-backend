// src/controllers/shiftController.js
import Shift from '../models/Shift.js';

export const getShifts = async (req, res, next) => {
  try {
    const shifts = await Shift.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: shifts });
  } catch (error) { next(error); }
};

export const getShiftById = async (req, res, next) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    res.status(200).json({ success: true, data: shift });
  } catch (error) { next(error); }
};

export const createShift = async (req, res, next) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json({ success: true, message: 'Shift added successfully', data: shift });
  } catch (error) { next(error); }
};

export const updateShift = async (req, res, next) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    res.status(200).json({ success: true, message: 'Shift updated successfully', data: shift });
  } catch (error) { next(error); }
};

export const deleteShift = async (req, res, next) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    res.status(200).json({ success: true, message: 'Shift deleted successfully' });
  } catch (error) { next(error); }
};