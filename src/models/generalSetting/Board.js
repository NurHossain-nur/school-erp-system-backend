// src/models/generalsetting/Board.js
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    boardName: { 
      type: String, 
      required: [true, 'Board Name is required'],
      trim: true 
    },
    banglaBoardName: { 
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);
export default Board;