// src/controllers/termController.js
import Term from '../models/Term.js';

export const getTerms = async (req, res, next) => {
  try {
    const { search, currentTerm } = req.query;
    let query = {};
    
    // নাম দিয়ে সার্চ
    if (search) {
      query.nameEnglish = { $regex: search, $options: 'i' };
    }
    
    // Current Term দিয়ে ফিল্টার
    if (currentTerm && currentTerm !== "") {
      query.currentTerm = currentTerm;
    }

    const terms = await Term.find(query).sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: terms });
  } catch (error) { next(error); }
};

export const getTermById = async (req, res, next) => {
  try {
    const term = await Term.findById(req.params.id);
    if (!term) return res.status(404).json({ success: false, message: 'Term not found' });
    res.status(200).json({ success: true, data: term });
  } catch (error) { next(error); }
};

export const createTerm = async (req, res, next) => {
  try {
    const term = await Term.create(req.body);
    res.status(201).json({ success: true, message: 'Term added successfully', data: term });
  } catch (error) { next(error); }
};

export const updateTerm = async (req, res, next) => {
  try {
    const term = await Term.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!term) return res.status(404).json({ success: false, message: 'Term not found' });
    res.status(200).json({ success: true, message: 'Term updated successfully', data: term });
  } catch (error) { next(error); }
};

export const deleteTerm = async (req, res, next) => {
  try {
    const term = await Term.findByIdAndDelete(req.params.id);
    if (!term) return res.status(404).json({ success: false, message: 'Term not found' });
    res.status(200).json({ success: true, message: 'Term deleted successfully' });
  } catch (error) { next(error); }
};