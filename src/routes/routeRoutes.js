// src/routes/routeRoutes.js
import express from 'express';
import { getRoutes, createRoute, getRouteById, updateRoute, deleteRoute } from '../controllers/routeController.js';

const router = express.Router();

router.route('/').get(getRoutes).post(createRoute);
router.route('/:id').get(getRouteById).put(updateRoute).delete(deleteRoute);

export default router;