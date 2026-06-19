// src/controllers/signatureController.js
import Signature from '../../models/generalSetting/Signature.js';

// ডিফল্ট টাইটেল লিস্ট (আপনার স্ক্রিনশট থেকে নেওয়া)
const defaultSignatures = [
  { key: 'class_test_left', title: 'Class Test Mark Sheet Left' },
  { key: 'class_test_middle', title: 'Class Test Mark Sheet Middle' },
  { key: 'class_test_right', title: 'Class Test Mark Sheet Right' },
  { key: 'admit_card', title: 'Admission Admit Card' },
  { key: 'admit_card_middle', title: 'Admit Card Middle' },
  { key: 'admit_card_right', title: 'Admit Card Right' },
  { key: 'admit_card_left', title: 'Admit Card Left' },
  { key: 'attendance_sheet_right', title: 'Attendance Sheet Right' },
  { key: 'attendance_sheet_middle', title: 'Attendance Sheet Middle' },
  { key: 'attendance_sheet_left', title: 'Attendance Sheet Left' },
  { key: 'fail_list_left', title: 'Fail List Left' },
  { key: 'fail_list_right', title: 'Fail List Right' },
  { key: 'fail_list_middle', title: 'Fail List Middle' },
  { key: 'student_fee_left', title: 'Student Fee Receipt Left' },
  { key: 'student_fee_middle', title: 'Student Fee Receipt Middle' },
  { key: 'student_fee_right', title: 'Student Fee Receipt Right' },
  { key: 'progress_report_left', title: 'Grand Final Progress Report Left' },
  { key: 'progress_report_middle', title: 'Grand Final Progress Report Middle' },
  { key: 'progress_report_right', title: 'Grand Final Progress Report Right' },
  { key: 'hr_id_card', title: 'HR ID Card' },
  { key: 'library_right', title: 'Library Right' },
  { key: 'library_middle', title: 'Library Middle' },
  { key: 'library_left', title: 'Library Left' },
  { key: 'mark_sheet_left', title: 'Mark Sheet Left' },
  { key: 'mark_sheet_middle', title: 'Mark Sheet Middle' },
  { key: 'mark_sheet_right', title: 'Mark Sheet Right' },
  { key: 'tc_left', title: 'TC Left' },
  { key: 'tc_right', title: 'TC Right' }
];

export const getSignatureSettings = async (req, res, next) => {
  try {
    let doc = await Signature.findOne();
    
    // ডাটাবেসে না থাকলে ডিফল্ট লিস্ট তৈরি করে দেবে
    if (!doc) {
      const initialSettings = defaultSignatures.map(sig => ({
        ...sig, level: "", levelBangla: "", isUse: "No", isUseClassTeacherSignature: "No", upperLevel: ".........................", signatureUrl: ""
      }));
      doc = await Signature.create({ settings: initialSettings });
    }
    
    res.status(200).json({ success: true, data: doc });
  } catch (error) { next(error); }
};

export const updateSignatureSettings = async (req, res, next) => {
  try {
    let doc = await Signature.findOne();
    if (!doc) return res.status(404).json({ success: false, message: 'Settings not found' });

    doc.settings = req.body.settings;
    await doc.save();
    
    res.status(200).json({ success: true, message: 'Signatures updated successfully', data: doc });
  } catch (error) { next(error); }
};