// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import instituteRoutes from './routes/instituteRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import classRoutes from './routes/classRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import studentCategoryRoutes from './routes/studentCategoryRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import semesterRoutes from './routes/semesterRoutes.js';
import termRoutes from './routes/termRoutes.js';
import mainMarkingHeadRoutes from './routes/mainMarkingHeadRoutes.js';
import gradePointRoutes from './routes/gradePointRoutes.js';
import academicSessionRoutes from './routes/academicSessionRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import mappingRoutes from './routes/config/mappingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import signatureRoutes from './routes/generalSetting/signatureRoutes.js';

import examRoutineSessionRoutes from './routes/examroutine/routineSessionRoutes.js';
import examRoutineProcessRoutes from './routes/examroutine/examRoutineProcessRoutes.js';

import boardRoutes from './routes/generalsetting/boardRoutes.js';
import coCurricularRoutes from './routes/generalsetting/coCurricularRoutes.js';
import moralBehaviorRoutes from './routes/generalsetting/moralBehaviorRoutes.js';
import occupationRoutes from './routes/generalsetting/occupationRoutes.js';




const app = express();

// --- 1. Global Security & Middlewares ---
app.use(helmet()); // HTTP হেডার সিকিউর করে

// 💡 ডাইনামিক CORS অরিজিন সেটআপ (লোকালহোস্ট এবং ভেরসেল দুইটাই সাপোর্ট করবে)
const allowedOrigins = [
  'http://localhost:3000',
  'https://schoolmanagement-seven-chi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // মোবাইল অ্যাপ, কার্ল (curl) বা কোনো অরিজিন ছাড়া রিকোয়েস্ট পাস করতে দেওয়া
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true, // কুকিজ (Cookies) আদান-প্রদানের জন্য
}));

app.use(express.json({ limit: '16kb' })); // JSON ডেটা রিসিভ করার জন্য
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser()); // ব্রাউজারের কুকি পড়ার জন্য
app.use(morgan('dev')); // টার্মিনালে API রিকোয়েস্টের লগ দেখার জন্য

// --- 2. Base Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to 360 EIMS ERP API - System is Running smoothly! 🚀',
  });
});

// --- 3. API Routes (পরে এখানে আমাদের রাউটগুলো আসবে) ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/institute', instituteRoutes);
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/classes', classRoutes);
app.use('/api/v1/sections', sectionRoutes);
app.use('/api/v1/faculties', facultyRoutes);
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/student-categories', studentCategoryRoutes);
app.use('/api/v1/shifts', shiftRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/semesters', semesterRoutes);
app.use('/api/v1/terms', termRoutes);
app.use('/api/v1/main-marking-heads', mainMarkingHeadRoutes);
app.use('/api/v1/grade-points', gradePointRoutes);
app.use('/api/v1/academic-sessions', academicSessionRoutes);
app.use('/api/v1/routes', routeRoutes);

app.use('/api/v1/mappings', mappingRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/signatures', signatureRoutes);


app.use('/api/v1/exam-routine/sessions', examRoutineSessionRoutes);
app.use('/api/v1/exam-routine/process', examRoutineProcessRoutes);

app.use('/api/v1/general-settings/boards', boardRoutes);
app.use('/api/v1/general-settings/co-curriculer-act', coCurricularRoutes);
app.use('/api/v1/general-settings/moral-behaviors', moralBehaviorRoutes);
app.use('/api/v1/general-settings/occupations', occupationRoutes);


// --- 4. 404 Route Handler ---
app.all('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// --- 5. Global Error Handler ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;