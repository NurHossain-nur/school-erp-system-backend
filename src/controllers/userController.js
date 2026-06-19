// src/controllers/userController.js
import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/v1/users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ orderNo: 1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user
// @route   POST /api/v1/users
export const createUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User Name already exists' });
    }

    const user = await User.create(req.body);
    
    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (error) {
    next(error);
  }
};


// @desc    Get single user for Edit page
// @route   GET /api/v1/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
export const updateUser = async (req, res) => { // 💡 এখান থেকে next প্যারামিটার সরিয়ে দিয়েছি
  try {
    // ১. পাসওয়ার্ড ফাঁকা আসলে আপডেট থেকে বাদ দেওয়া
    if (!req.body.password || req.body.password === "") {
      delete req.body.password;
    }

    // ২. MongoDB-এর রেস্ট্রিক্টেড ফিল্ডগুলো ডিলিট করে দেওয়া
    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.__v;

    // ৩. ডাটাবেস থেকে ইউজার খুঁজে বের করা
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ৪. নতুন ডাটা ইউজারের সাথে মার্জ করা
    Object.assign(user, req.body);
    
    // ৫. ডাটা সেভ করা
    await user.save(); 

    // ৬. সফল হলে রেসপন্স
    res.status(200).json({ success: true, message: 'User updated successfully' });
    
  } catch (error) { 
    console.error("Update Error Details:", error);
    
    // 💡 ৭. next(error) এর বদলে সরাসরি res.status(500) দিয়ে ফ্রন্টএন্ডে এরর পাঠানো হচ্ছে
    res.status(500).json({ 
      success: false, 
      message: error.message || "Internal Server Error during update" 
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) { next(error); }
};

// @desc    Generate new PIN for user
// @route   POST /api/v1/users/:id/pin
export const generatePin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // ৬ ডিজিটের একটি র‍্যান্ডম পিন জেনারেট করা
    const rawPin = Math.floor(100000 + Math.random() * 900000).toString(); 
    
    user.pin = rawPin;
    await user.save(); // হ্যাশ হয়ে সেভ হবে

    // ফ্রন্টএন্ডে র-পিনটি পাঠিয়ে দেওয়া, যাতে অ্যাডমিন দেখতে পারে
    res.status(200).json({ success: true, message: 'PIN Generated', pin: rawPin });
  } catch (error) { next(error); }
};