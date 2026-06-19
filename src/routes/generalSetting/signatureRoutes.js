// src/routes/generalSetting/signatureRoutes.js
import express from 'express';
import { getSignatureSettings, updateSignatureSettings } from '../../controllers/generalSetting/signatureController.js';

const router = express.Router();

// Get and Update routes for Signature settings
router.route('/')
  .get(getSignatureSettings)
  .put(updateSignatureSettings);

export default router;