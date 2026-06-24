// src/controllers/students/studentOffenseController.js
import StudentOffense from '../../models/students/StudentOffense.js';

export const getOffenses = async (req, res, next) => {
  try {
    const offenses = await StudentOffense.find().sort({ orderNo: 1 }); // Sort by Order No ascending
    res.status(200).json({ success: true, data: offenses });
  } catch (error) { next(error); }
};

export const getOffenseById = async (req, res, next) => {
  try {
    const offense = await StudentOffense.findById(req.params.id);
    if (!offense) return res.status(404).json({ success: false, message: 'Offense type not found' });
    res.status(200).json({ success: true, data: offense });
  } catch (error) { next(error); }
};

export const createOffense = async (req, res, next) => {
  try {
    const newOffense = await StudentOffense.create(req.body);
    res.status(201).json({ success: true, message: 'Offense Type added successfully', data: newOffense });
  } catch (error) { next(error); }
};

export const updateOffense = async (req, res, next) => {
  try {
    const updatedOffense = await StudentOffense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOffense) return res.status(404).json({ success: false, message: 'Offense type not found' });
    res.status(200).json({ success: true, message: 'Offense Type updated successfully', data: updatedOffense });
  } catch (error) { next(error); }
};

export const deleteOffense = async (req, res, next) => {
  try {
    const deletedOffense = await StudentOffense.findByIdAndDelete(req.params.id);
    if (!deletedOffense) return res.status(404).json({ success: false, message: 'Offense type not found' });
    res.status(200).json({ success: true, message: 'Offense Type deleted successfully' });
  } catch (error) { next(error); }
};