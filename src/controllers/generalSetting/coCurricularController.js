// src/controllers/generalSetting/coCurricularController.js
import CoCurricular from '../../models/generalSetting/CoCurricular.js';

export const getCoCurriculars = async (req, res, next) => {
  try {
    const activities = await CoCurricular.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: activities });
  } catch (error) { next(error); }
};

export const getCoCurricularById = async (req, res, next) => {
  try {
    const activity = await CoCurricular.findById(req.params.id);
    if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });
    res.status(200).json({ success: true, data: activity });
  } catch (error) { next(error); }
};

export const createCoCurricular = async (req, res, next) => {
  try {
    const newActivity = await CoCurricular.create(req.body);
    res.status(201).json({ success: true, message: 'Activity added successfully', data: newActivity });
  } catch (error) { next(error); }
};

export const updateCoCurricular = async (req, res, next) => {
  try {
    const updatedActivity = await CoCurricular.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedActivity) return res.status(404).json({ success: false, message: 'Activity not found' });
    res.status(200).json({ success: true, message: 'Activity updated successfully', data: updatedActivity });
  } catch (error) { next(error); }
};

export const deleteCoCurricular = async (req, res, next) => {
  try {
    const deletedActivity = await CoCurricular.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ success: false, message: 'Activity not found' });
    res.status(200).json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) { next(error); }
};