// src/controllers/generalsetting/occupationController.js
import Occupation from '../../models/generalsetting/Occupation.js';

export const getOccupations = async (req, res, next) => {
  try {
    const occupations = await Occupation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: occupations });
  } catch (error) { next(error); }
};

export const getOccupationById = async (req, res, next) => {
  try {
    const occupation = await Occupation.findById(req.params.id);
    if (!occupation) return res.status(404).json({ success: false, message: 'Occupation not found' });
    res.status(200).json({ success: true, data: occupation });
  } catch (error) { next(error); }
};

export const createOccupation = async (req, res, next) => {
  try {
    const newOccupation = await Occupation.create(req.body);
    res.status(201).json({ success: true, message: 'Occupation added successfully', data: newOccupation });
  } catch (error) { 
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'This occupation already exists' });
    next(error); 
  }
};

export const updateOccupation = async (req, res, next) => {
  try {
    const updatedOccupation = await Occupation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedOccupation) return res.status(404).json({ success: false, message: 'Occupation not found' });
    res.status(200).json({ success: true, message: 'Occupation updated successfully', data: updatedOccupation });
  } catch (error) { 
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'This occupation already exists' });
    next(error); 
  }
};

export const deleteOccupation = async (req, res, next) => {
  try {
    const deletedOccupation = await Occupation.findByIdAndDelete(req.params.id);
    if (!deletedOccupation) return res.status(404).json({ success: false, message: 'Occupation not found' });
    res.status(200).json({ success: true, message: 'Occupation deleted successfully' });
  } catch (error) { next(error); }
};