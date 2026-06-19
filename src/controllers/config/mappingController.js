// src/controllers/config/mappingController.js
import Mapping from '../../models/config/Mapping.js';

// হেল্পার ফাংশন: মেইন ম্যাপিং ডকুমেন্টটি খুঁজে বের করা বা তৈরি করা
const getMappingDocument = async () => {
  let doc = await Mapping.findOne();
  if (!doc) {
    doc = await Mapping.create({ classSectionMapping: [] });
  }
  return doc;
};

export const getClassSectionMappings = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    res.status(200).json({ success: true, data: doc.classSectionMapping });
  } catch (error) { next(error); }
};

export const getClassSectionMappingById = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSectionMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: mapping });
  } catch (error) { next(error); }
};

export const createClassSectionMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const { className, shiftName, sections } = req.body;

    // চেক করা হচ্ছে এই ক্লাস এবং শিফটের ম্যাপিং আগে থেকেই আছে কি না
    const exists = doc.classSectionMapping.find(m => m.className === className && m.shiftName === shiftName);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Mapping for this Class and Shift already exists' });
    }

    doc.classSectionMapping.push({ className, shiftName, sections });
    await doc.save();
    res.status(201).json({ success: true, message: 'Mapped successfully' });
  } catch (error) { next(error); }
};

export const updateClassSectionMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSectionMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });

    mapping.className = req.body.className;
    mapping.shiftName = req.body.shiftName;
    mapping.sections = req.body.sections;

    await doc.save();
    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) { next(error); }
};


export const deleteClassSectionMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    
    // নির্দিষ্ট ID দিয়ে সাব-ডকুমেন্ট খুঁজে বের করা
    const mapping = doc.classSectionMapping.id(req.params.id);
    
    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found' });
    }

    // সাব-ডকুমেন্টটি রিমুভ করা
    mapping.deleteOne(); 
    
    // মেইন ডকুমেন্ট সেভ করা
    await doc.save();
    
    res.status(200).json({ success: true, message: 'Mapping deleted successfully' });
  } catch (error) { 
    next(error); 
  }
};






// Class Group Mappings

export const getClassGroupMappings = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    res.status(200).json({ success: true, data: doc.classGroupMapping });
  } catch (error) { next(error); }
};

export const getClassGroupMappingById = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classGroupMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: mapping });
  } catch (error) { next(error); }
};

export const createClassGroupMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const { className, groups } = req.body;

    const exists = doc.classGroupMapping.find(m => m.className === className);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Mapping for this Class already exists' });
    }

    doc.classGroupMapping.push({ className, groups });
    await doc.save();
    res.status(201).json({ success: true, message: 'Mapped successfully' });
  } catch (error) { next(error); }
};

export const updateClassGroupMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classGroupMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });

    mapping.className = req.body.className;
    mapping.groups = req.body.groups;

    await doc.save();
    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) { next(error); }
};

export const deleteClassGroupMapping = async (req, res, next) => {
  try {
    const updatedDoc = await Mapping.findOneAndUpdate(
      {}, 
      { $pull: { classGroupMapping: { _id: req.params.id } } },
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Mapping not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) { next(error); }
};

// 💡 Copy Functionality
export const copyClassGroupMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const sourceMapping = doc.classGroupMapping.id(req.params.id);
    if (!sourceMapping) return res.status(404).json({ success: false, message: 'Source not found' });

    const { targetClass } = req.body;

    // টার্গেট ক্লাসে আগে থেকে থাকলে আপডেট হবে, নাহলে নতুন অ্যাড হবে
    let existing = doc.classGroupMapping.find(m => m.className === targetClass);
    if (existing) {
      existing.groups = sourceMapping.groups;
    } else {
      doc.classGroupMapping.push({ className: targetClass, groups: sourceMapping.groups });
    }

    await doc.save();
    res.status(200).json({ success: true, message: 'Mapping copied successfully!' });
  } catch (error) { next(error); }
};









// --- Class Semester Mappings ---

export const getClassSemesterMappings = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    res.status(200).json({ success: true, data: doc.classSemesterMapping });
  } catch (error) { next(error); }
};

export const getClassSemesterMappingById = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSemesterMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: mapping });
  } catch (error) { next(error); }
};

export const createClassSemesterMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const { year, className, semesters } = req.body;

    // একই ক্লাস এবং বছরের ম্যাপিং আগে থেকে আছে কি না চেক
    const exists = doc.classSemesterMapping.find(m => m.className === className && m.year === year);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Mapping for this Class and Year already exists' });
    }

    doc.classSemesterMapping.push({ year, className, semesters });
    await doc.save();
    res.status(201).json({ success: true, message: 'Mapped successfully' });
  } catch (error) { next(error); }
};

export const updateClassSemesterMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSemesterMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });

    mapping.year = req.body.year;
    mapping.className = req.body.className;
    mapping.semesters = req.body.semesters;

    await doc.save();
    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) { next(error); }
};

export const deleteClassSemesterMapping = async (req, res, next) => {
  try {
    const updatedDoc = await Mapping.findOneAndUpdate(
      {}, 
      { $pull: { classSemesterMapping: { _id: req.params.id } } },
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Mapping not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) { next(error); }
};

// 💡 Copy Functionality
export const copyClassSemesterMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const sourceMapping = doc.classSemesterMapping.id(req.params.id);
    if (!sourceMapping) return res.status(404).json({ success: false, message: 'Source not found' });

    const { targetYear, targetClass } = req.body;

    let existing = doc.classSemesterMapping.find(m => m.className === targetClass && m.year === targetYear);
    if (existing) {
      existing.semesters = sourceMapping.semesters;
    } else {
      doc.classSemesterMapping.push({ year: targetYear, className: targetClass, semesters: sourceMapping.semesters });
    }

    await doc.save();
    res.status(200).json({ success: true, message: 'Mapping copied successfully!' });
  } catch (error) { next(error); }
};







// --- Class Subject Mappings ---

export const getClassSubjectMappings = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    res.status(200).json({ success: true, data: doc.classSubjectMapping });
  } catch (error) { next(error); }
};

export const getClassSubjectMappingById = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSubjectMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: mapping });
  } catch (error) { next(error); }
};

export const createClassSubjectMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const { className, semesterName, subjects } = req.body;

    const exists = doc.classSubjectMapping.find(m => m.className === className && m.semesterName === semesterName);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Mapping for this Class and Semester already exists' });
    }

    doc.classSubjectMapping.push({ className, semesterName, subjects });
    await doc.save();
    res.status(201).json({ success: true, message: 'Mapped successfully' });
  } catch (error) { next(error); }
};

export const updateClassSubjectMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const mapping = doc.classSubjectMapping.id(req.params.id);
    if (!mapping) return res.status(404).json({ success: false, message: 'Not found' });

    mapping.className = req.body.className;
    mapping.semesterName = req.body.semesterName;
    mapping.subjects = req.body.subjects;

    await doc.save();
    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) { next(error); }
};

export const deleteClassSubjectMapping = async (req, res, next) => {
  try {
    const updatedDoc = await Mapping.findOneAndUpdate(
      {}, 
      { $pull: { classSubjectMapping: { _id: req.params.id } } },
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ success: false, message: 'Mapping not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) { next(error); }
};

// Copy Functionality
export const copyClassSubjectMapping = async (req, res, next) => {
  try {
    const doc = await getMappingDocument();
    const sourceMapping = doc.classSubjectMapping.id(req.params.id);
    if (!sourceMapping) return res.status(404).json({ success: false, message: 'Source not found' });

    const { targetClass, targetSemester } = req.body;

    let existing = doc.classSubjectMapping.find(m => m.className === targetClass && m.semesterName === targetSemester);
    if (existing) {
      existing.subjects = sourceMapping.subjects;
    } else {
      doc.classSubjectMapping.push({ className: targetClass, semesterName: targetSemester, subjects: sourceMapping.subjects });
    }

    await doc.save();
    res.status(200).json({ success: true, message: 'Mapping copied successfully!' });
  } catch (error) { next(error); }
};