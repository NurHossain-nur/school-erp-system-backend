// src/models/Group.js
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    faculty: { 
      type: String, // এখানে চাইলে Faculty এর _id ও রাখতে পারেন, তবে আপাতত নাম রাখছি 
      required: [true, 'Faculty is required'] 
    },
    name: { 
      type: String, 
      required: [true, 'Group Name is required'],
      trim: true 
    },
    nameBangla: { 
      type: String,
      trim: true
    },
    code: { 
      type: String, 
      required: [true, 'Code is required'] 
    },
    orderNo: { 
      type: Number, 
      required: [true, 'Order No is required'] 
    },
    overview: {
      type: String // Rich Text Editor এর HTML ডেটা এখানে সেভ হবে
    }
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
export default Group;