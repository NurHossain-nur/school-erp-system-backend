// src/controllers/examroutine/routineSessionController.js
import Routine from '../../models/examroutine/Routine.js';

// হেল্পার ফাংশন: মেইন রুটিন ডকুমেন্টটি খুঁজে বের করা বা তৈরি করা
const getRoutineDocument = async () => {
  let doc = await Routine.findOne();
  if (!doc) {
    doc = await Routine.create({ examRoutineSession: [] });
  }
  return doc;
};

export const getRoutineSessions = async (req, res, next) => {
  try {
    const doc = await getRoutineDocument();
    res.status(200).json({ success: true, data: doc.examRoutineSession });
  } catch (error) { next(error); }
};

export const getRoutineSessionById = async (req, res, next) => {
  try {
    const doc = await getRoutineDocument();
    const session = doc.examRoutineSession.id(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: session });
  } catch (error) { next(error); }
};

export const createRoutineSession = async (req, res, next) => {
  try {
    const doc = await getRoutineDocument();
    const { name, routineHeader, startTime, endTime } = req.body;

    const exists = doc.examRoutineSession.find(s => s.name === name);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Session with this name already exists' });
    }

    doc.examRoutineSession.push({ name, routineHeader, startTime, endTime });
    await doc.save();
    res.status(201).json({ success: true, message: 'Session added successfully' });
  } catch (error) { next(error); }
};

export const updateRoutineSession = async (req, res, next) => {
  try {
    const doc = await getRoutineDocument();
    const session = doc.examRoutineSession.id(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.name = req.body.name;
    session.routineHeader = req.body.routineHeader;
    session.startTime = req.body.startTime;
    session.endTime = req.body.endTime;

    await doc.save();
    res.status(200).json({ success: true, message: 'Session updated successfully' });
  } catch (error) { next(error); }
};

export const deleteRoutineSession = async (req, res, next) => {
  try {
    const updatedDoc = await Routine.findOneAndUpdate(
      {}, 
      { $pull: { examRoutineSession: { _id: req.params.id } } },
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Routine collection not found' });
    
    res.status(200).json({ success: true, message: 'Session deleted successfully' });
  } catch (error) { next(error); }
};