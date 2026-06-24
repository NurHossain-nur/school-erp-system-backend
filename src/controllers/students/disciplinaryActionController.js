// src/controllers/students/disciplinaryActionController.js
import DisciplinaryAction from '../../models/students/DisciplinaryAction.js';

export const getActions = async (req, res, next) => {
  try {
    const { studentId, offenseType } = req.query;
    
    // Build filter query dynamically
    let query = {};
    if (offenseType) query.offenseType = offenseType;

    // We populate the linked models to get full details for the table
    let actions = await DisciplinaryAction.find(query)
      .populate('student', 'studentId name classShiftSection')
      .populate('offenseType', 'name')
      .sort({ createdAt: -1 });

    // Filter by studentId string if provided (since it's inside the populated student object)
    if (studentId) {
      actions = actions.filter(action => 
        action.student && action.student.studentId.includes(studentId)
      );
    }

    res.status(200).json({ success: true, data: actions });
  } catch (error) { next(error); }
};

export const getActionById = async (req, res, next) => {
  try {
    const action = await DisciplinaryAction.findById(req.params.id)
      .populate('student')
      .populate('offenseType');
    if (!action) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, data: action });
  } catch (error) { next(error); }
};

export const createAction = async (req, res, next) => {
  try {
    const newAction = await DisciplinaryAction.create(req.body);
    res.status(201).json({ success: true, message: 'Disciplinary Action added successfully', data: newAction });
  } catch (error) { next(error); }
};

export const updateAction = async (req, res, next) => {
  try {
    const updatedAction = await DisciplinaryAction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAction) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, message: 'Disciplinary Action updated successfully', data: updatedAction });
  } catch (error) { next(error); }
};

export const deleteAction = async (req, res, next) => {
  try {
    const deletedAction = await DisciplinaryAction.findByIdAndDelete(req.params.id);
    if (!deletedAction) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, message: 'Disciplinary Action deleted successfully' });
  } catch (error) { next(error); }
};