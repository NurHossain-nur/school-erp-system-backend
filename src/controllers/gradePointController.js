// src/controllers/gradePointController.js
import GradePoint from '../models/GradePoint.js';

export const getGradePoints = async (req, res, next) => {
  try {
    const grades = await GradePoint.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: grades });
  } catch (error) { next(error); }
};

export const getGradePointById = async (req, res, next) => {
  try {
    const grade = await GradePoint.findById(req.params.id);
    if (!grade) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: grade });
  } catch (error) { next(error); }
};

export const createGradePoint = async (req, res, next) => {
  try {
    const exists = await GradePoint.findOne({ className: req.body.className });
    if (exists) return res.status(400).json({ success: false, message: 'Configuration for this class already exists' });

    const newGrade = await GradePoint.create(req.body);
    res.status(201).json({ success: true, message: 'Added successfully', data: newGrade });
  } catch (error) { next(error); }
};

export const updateGradePoint = async (req, res, next) => {
  try {
    const grade = await GradePoint.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!grade) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Updated successfully', data: grade });
  } catch (error) { next(error); }
};

export const deleteGradePoint = async (req, res, next) => {
  try {
    await GradePoint.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) { next(error); }
};

// 💡 স্পেশাল: Add Default Data
export const addDefaultData = async (req, res, next) => {
  try {
    const defaultGrades = [
      { startRange: 80, endRange: 100, grade: "A+", gradePoint: 5.00, comments: "Excellent", isShowInMarksheet: "Yes" },
      { startRange: 70, endRange: 79, grade: "A", gradePoint: 4.00, comments: "Very Good", isShowInMarksheet: "Yes" },
      { startRange: 60, endRange: 69, grade: "A-", gradePoint: 3.50, comments: "Good", isShowInMarksheet: "Yes" },
      { startRange: 50, endRange: 59, grade: "B", gradePoint: 3.00, comments: "Above Average", isShowInMarksheet: "Yes" },
      { startRange: 40, endRange: 49, grade: "C", gradePoint: 2.00, comments: "Average", isShowInMarksheet: "Yes" },
      { startRange: 33, endRange: 39, grade: "D", gradePoint: 1.00, comments: "Pass", isShowInMarksheet: "Yes" },
      { startRange: 0, endRange: 32, grade: "F", gradePoint: 0.00, comments: "Fail", isShowInMarksheet: "Yes" }
    ];

    // ফ্রন্টএন্ড থেকে ক্লাস নেম পাঠানো হবে
    const { className } = req.body;
    if (!className) return res.status(400).json({ success: false, message: 'Class name is required' });

    let existing = await GradePoint.findOne({ className });
    if (existing) {
      existing.grades = defaultGrades;
      await existing.save();
    } else {
      await GradePoint.create({ className, grades: defaultGrades });
    }

    res.status(200).json({ success: true, message: 'Default data added successfully!' });
  } catch (error) { next(error); }
};