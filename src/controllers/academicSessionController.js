// src/controllers/academicSessionController.js
import AcademicSession from '../models/AcademicSession.js';

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await AcademicSession.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: sessions });
  } catch (error) { next(error); }
};

export const getSessionById = async (req, res, next) => {
  try {
    const session = await AcademicSession.findById(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: session });
  } catch (error) { next(error); }
};

export const createSession = async (req, res, next) => {
  try {
    const session = await AcademicSession.create(req.body);
    res.status(201).json({ success: true, message: 'Session added successfully', data: session });
  } catch (error) { next(error); }
};

export const updateSession = async (req, res, next) => {
  try {
    const session = await AcademicSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, message: 'Session updated successfully', data: session });
  } catch (error) { next(error); }
};

export const deleteSession = async (req, res, next) => {
  try {
    const session = await AcademicSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, message: 'Session deleted successfully' });
  } catch (error) { next(error); }
};