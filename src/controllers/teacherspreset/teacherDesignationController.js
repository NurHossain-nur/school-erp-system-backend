// src/controllers/teacherspreset/teacherDesignationController.js
import TeacherPreset from '../../models/teacherspreset/TeacherPreset.js';

const getPresetDocument = async () => {
  let doc = await TeacherPreset.findOne();
  if (!doc) {
    doc = await TeacherPreset.create({ teacherSection: [], teacherDesignation: [] });
  }
  return doc;
};

export const getTeacherDesignations = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    // Sorting Order অনুযায়ী সর্ট করে ডেটা পাঠানো হচ্ছে
    const designations = doc.teacherDesignation.sort((a, b) => a.sortingOrder - b.sortingOrder);
    res.status(200).json({ success: true, data: designations });
  } catch (error) { next(error); }
};

export const getTeacherDesignationById = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const designation = doc.teacherDesignation.id(req.params.id);
    if (!designation) return res.status(404).json({ success: false, message: 'Designation not found' });
    res.status(200).json({ success: true, data: designation });
  } catch (error) { next(error); }
};

export const createTeacherDesignation = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    doc.teacherDesignation.push(req.body);
    await doc.save();
    res.status(201).json({ success: true, message: 'Designation added successfully' });
  } catch (error) { next(error); }
};

export const updateTeacherDesignation = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const designation = doc.teacherDesignation.id(req.params.id);
    if (!designation) return res.status(404).json({ success: false, message: 'Designation not found' });

    // Update fields
    designation.name = req.body.name;
    designation.banglaName = req.body.banglaName;
    designation.numberOfDesignation = req.body.numberOfDesignation;
    designation.sortingOrder = req.body.sortingOrder;
    designation.isTeacherDesignation = req.body.isTeacherDesignation;

    await doc.save();
    res.status(200).json({ success: true, message: 'Designation updated successfully' });
  } catch (error) { next(error); }
};

export const deleteTeacherDesignation = async (req, res, next) => {
  try {
    const updatedDoc = await TeacherPreset.findOneAndUpdate(
      {}, 
      { $pull: { teacherDesignation: { _id: req.params.id } } },
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Preset collection not found' });
    
    res.status(200).json({ success: true, message: 'Designation deleted successfully' });
  } catch (error) { next(error); }
};