// src/routes/uploadRoutes.js
import express from 'express';
import { uploadMiddleware, uploadImage } from '../controllers/uploadController.js';

const router = express.Router();
router.post('/image', uploadMiddleware.single('file'), uploadImage);

export default router;