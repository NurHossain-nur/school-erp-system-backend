// src/controllers/roomController.js
import Room from '../models/Room.js';

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, data: rooms });
  } catch (error) { next(error); }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.status(200).json({ success: true, data: room });
  } catch (error) { next(error); }
};

export const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, message: 'Room added successfully', data: room });
  } catch (error) { next(error); }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.status(200).json({ success: true, message: 'Room updated successfully', data: room });
  } catch (error) { next(error); }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) { next(error); }
};