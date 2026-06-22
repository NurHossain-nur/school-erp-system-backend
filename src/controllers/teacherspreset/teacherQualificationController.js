// src/controllers/teacherspreset/teacherQualificationController.js
import TeacherPreset from '../../models/teacherspreset/TeacherPreset.js';

const getPresetDocument = async () => {
  let doc = await TeacherPreset.findOne();
  if (!doc) {
    doc = await TeacherPreset.create({ 
      teacherSection: [], teacherDesignation: [], teacherPayCode: [], teacherQualification: [] 
    });
  }
  return doc;
};

export const getTeacherQualifications = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    res.status(200).json({ success: true, data: doc.teacherQualification });
  } catch (error) { next(error); }
};

export const getTeacherQualificationById = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const qualification = doc.teacherQualification.id(req.params.id);
    if (!qualification) return res.status(404).json({ success: false, message: 'Qualification not found' });
    res.status(200).json({ success: true, data: qualification });
  } catch (error) { next(error); }
};

export const createTeacherQualification = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const { name, banglaName, isActiveForAdmission } = req.body;

    const exists = doc.teacherQualification.find(q => q.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'This Qualification already exists' });
    }

    doc.teacherQualification.push({ name, banglaName, isActiveForAdmission });
    await doc.save();
    res.status(201).json({ success: true, message: 'Qualification added successfully' });
  } catch (error) { next(error); }
};

export const updateTeacherQualification = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const qualification = doc.teacherQualification.id(req.params.id);
    if (!qualification) return res.status(404).json({ success: false, message: 'Qualification not found' });

    qualification.name = req.body.name;
    qualification.banglaName = req.body.banglaName;
    qualification.isActiveForAdmission = req.body.isActiveForAdmission;

    await doc.save();
    res.status(200).json({ success: true, message: 'Qualification updated successfully' });
  } catch (error) { next(error); }
};

export const deleteTeacherQualification = async (req, res, next) => {
  try {
    const updatedDoc = await TeacherPreset.findOneAndUpdate(
      {}, 
      { $pull: { teacherQualification: { _id: req.params.id } } },
      { new: true }
    );
    
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Preset collection not found' });
    res.status(200).json({ success: true, message: 'Qualification deleted successfully' });
  } catch (error) { next(error); }
};