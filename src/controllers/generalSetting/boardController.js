// src/controllers/generalsetting/boardController.js
import Board from '../../models/generalsetting/Board.js';

export const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: boards });
  } catch (error) { next(error); }
};

export const getBoardById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ success: false, message: 'Board not found' });
    res.status(200).json({ success: true, data: board });
  } catch (error) { next(error); }
};

export const createBoard = async (req, res, next) => {
  try {
    const newBoard = await Board.create(req.body);
    res.status(201).json({ success: true, message: 'Board added successfully', data: newBoard });
  } catch (error) { next(error); }
};

export const updateBoard = async (req, res, next) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBoard) return res.status(404).json({ success: false, message: 'Board not found' });
    res.status(200).json({ success: true, message: 'Board updated successfully', data: updatedBoard });
  } catch (error) { next(error); }
};

export const deleteBoard = async (req, res, next) => {
  try {
    const deletedBoard = await Board.findByIdAndDelete(req.params.id);
    if (!deletedBoard) return res.status(404).json({ success: false, message: 'Board not found' });
    res.status(200).json({ success: true, message: 'Board deleted successfully' });
  } catch (error) { next(error); }
};