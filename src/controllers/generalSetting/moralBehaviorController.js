// src/controllers/generalSetting/moralBehaviorController.js
import MoralBehavior from '../../models/generalSetting/MoralBehavior.js';

export const getMoralBehaviors = async (req, res, next) => {
  try {
    // Order No অনুযায়ী সাজিয়ে ডেটা পাঠানো হচ্ছে
    const behaviors = await MoralBehavior.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: behaviors });
  } catch (error) { next(error); }
};

export const getMoralBehaviorById = async (req, res, next) => {
  try {
    const behavior = await MoralBehavior.findById(req.params.id);
    if (!behavior) return res.status(404).json({ success: false, message: 'Moral Behavior not found' });
    res.status(200).json({ success: true, data: behavior });
  } catch (error) { next(error); }
};

export const createMoralBehavior = async (req, res, next) => {
  try {
    const newBehavior = await MoralBehavior.create(req.body);
    res.status(201).json({ success: true, message: 'Moral Behavior added successfully', data: newBehavior });
  } catch (error) { next(error); }
};

export const updateMoralBehavior = async (req, res, next) => {
  try {
    const updatedBehavior = await MoralBehavior.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBehavior) return res.status(404).json({ success: false, message: 'Moral Behavior not found' });
    res.status(200).json({ success: true, message: 'Moral Behavior updated successfully', data: updatedBehavior });
  } catch (error) { next(error); }
};

export const deleteMoralBehavior = async (req, res, next) => {
  try {
    const deletedBehavior = await MoralBehavior.findByIdAndDelete(req.params.id);
    if (!deletedBehavior) return res.status(404).json({ success: false, message: 'Moral Behavior not found' });
    res.status(200).json({ success: true, message: 'Moral Behavior deleted successfully' });
  } catch (error) { next(error); }
};