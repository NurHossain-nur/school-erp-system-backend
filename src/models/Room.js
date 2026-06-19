// src/models/Room.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Room Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      required: [true, 'Bangla Name is required'],
      trim: true
    },
    orderNo: { 
      type: Number,
      default: 0
    },
    seatCapacity: {
      type: Number
    },
    numberOfColumn: {
      type: Number
    },
    numberOfSeatPerColumn: {
      type: Number
    }
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;