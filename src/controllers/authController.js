// src/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// JWT টোকেন জেনারেট করার ফাংশন
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d', // টোকেনের মেয়াদ ৩০ দিন
  });
};

// @desc    Auth user & get token (Login)
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // ১. ইউজারনেম এবং পাসওয়ার্ড দেওয়া হয়েছে কি না চেক করা
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // ২. ডাটাবেসে ইউজার আছে কি না চেক করা (পাসওয়ার্ডসহ আনছি কারণ মডেলে select: false দেওয়া আছে)
    const user = await User.findOne({ username }).select('+password +pin');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // ৩. ইউজার অ্যাক্টিভ কি না চেক করা
    if (user.status !== 'Active') {
      return res.status(403).json({ success: false, message: 'Your account is inactive. Contact admin.' });
    }

    // ৪. টোকেন তৈরি করা
    const token = generateToken(user._id, user.role);

    // ৫. কুকিতে টোকেন সেট করা (More secure than local storage)
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      httpOnly: true, // XSS অ্যাটাক থেকে বাঁচানোর জন্য
      secure: process.env.NODE_ENV === 'production', // প্রোডাকশনে https লাগবে
      sameSite: 'strict'
    };

    res.cookie('jwt', token, cookieOptions);

    // ৬. রেসপন্স পাঠানো
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token // ফ্রন্টএন্ডের জন্য টোকেনটিও পাঠিয়ে দিলাম
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // ১০ সেকেন্ডে কুকি এক্সপায়ার করে দেওয়া
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};