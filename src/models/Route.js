// src/models/Route.js
import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    nameEnglish: { 
      type: String, 
      required: [true, 'English Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', routeSchema);
export default Route;