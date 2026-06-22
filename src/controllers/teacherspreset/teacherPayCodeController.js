// src/controllers/teacherspreset/teacherPayCodeController.js
import TeacherPreset from '../../models/teacherspreset/TeacherPreset.js';

const getPresetDocument = async () => {
  let doc = await TeacherPreset.findOne();
  if (!doc) {
    doc = await TeacherPreset.create({ teacherSection: [], teacherDesignation: [], teacherPayCode: [] });
  }
  return doc;
};

export const getTeacherPayCodes = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    res.status(200).json({ success: true, data: doc.teacherPayCode });
  } catch (error) { next(error); }
};

export const getTeacherPayCodeById = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const payCode = doc.teacherPayCode.id(req.params.id);
    if (!payCode) return res.status(404).json({ success: false, message: 'Pay Code not found' });
    res.status(200).json({ success: true, data: payCode });
  } catch (error) { next(error); }
};

export const createTeacherPayCode = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const { name } = req.body;

    const exists = doc.teacherPayCode.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'This Pay Code already exists' });
    }

    doc.teacherPayCode.push({ name });
    await doc.save();
    res.status(201).json({ success: true, message: 'Pay Code added successfully' });
  } catch (error) { next(error); }
};

export const updateTeacherPayCode = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const payCode = doc.teacherPayCode.id(req.params.id);
    if (!payCode) return res.status(404).json({ success: false, message: 'Pay Code not found' });

    payCode.name = req.body.name;
    await doc.save();
    res.status(200).json({ success: true, message: 'Pay Code updated successfully' });
  } catch (error) { next(error); }
};

export const deleteTeacherPayCode = async (req, res, next) => {
  try {
    const updatedDoc = await TeacherPreset.findOneAndUpdate(
      {}, 
      { $pull: { teacherPayCode: { _id: req.params.id } } },
      { new: true }
    );
    
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Preset collection not found' });
    res.status(200).json({ success: true, message: 'Pay Code deleted successfully' });
  } catch (error) { next(error); }
};