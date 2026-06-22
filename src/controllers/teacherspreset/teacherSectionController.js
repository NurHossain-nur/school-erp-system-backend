// src/controllers/teacherspreset/teacherSectionController.js
import TeacherPreset from '../../models/teacherspreset/TeacherPreset.js';

// হেল্পার ফাংশন: মেইন প্রিসেট ডকুমেন্টটি খুঁজে বের করা বা তৈরি করা
const getPresetDocument = async () => {
  let doc = await TeacherPreset.findOne();
  if (!doc) {
    doc = await TeacherPreset.create({ teacherSection: [] });
  }
  return doc;
};

export const getTeacherSections = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    res.status(200).json({ success: true, data: doc.teacherSection });
  } catch (error) { next(error); }
};

export const getTeacherSectionById = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const section = doc.teacherSection.id(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, data: section });
  } catch (error) { next(error); }
};

export const createTeacherSection = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const { name } = req.body;

    // চেক করা হচ্ছে একই নামের সেকশন আগে থেকে আছে কি না
    const exists = doc.teacherSection.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'This section already exists' });
    }

    doc.teacherSection.push({ name });
    await doc.save();
    res.status(201).json({ success: true, message: 'Teacher section added successfully' });
  } catch (error) { next(error); }
};

export const updateTeacherSection = async (req, res, next) => {
  try {
    const doc = await getPresetDocument();
    const section = doc.teacherSection.id(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

    section.name = req.body.name;
    await doc.save();
    res.status(200).json({ success: true, message: 'Teacher section updated successfully' });
  } catch (error) { next(error); }
};

export const deleteTeacherSection = async (req, res, next) => {
  try {
    const updatedDoc = await TeacherPreset.findOneAndUpdate(
      {}, 
      { $pull: { teacherSection: { _id: req.params.id } } },
      { new: true }
    );
    
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Preset collection not found' });
    res.status(200).json({ success: true, message: 'Teacher section deleted successfully' });
  } catch (error) { next(error); }
};