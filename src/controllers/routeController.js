// src/controllers/routeController.js
import Route from '../models/Route.js';

export const getRoutes = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query.nameEnglish = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const routes = await Route.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: routes });
  } catch (error) { next(error); }
};

export const getRouteById = async (req, res, next) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    res.status(200).json({ success: true, data: route });
  } catch (error) { next(error); }
};

export const createRoute = async (req, res, next) => {
  try {
    const newRoute = await Route.create(req.body);
    res.status(201).json({ success: true, message: 'Route added successfully', data: newRoute });
  } catch (error) { next(error); }
};

export const updateRoute = async (req, res, next) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRoute) return res.status(404).json({ success: false, message: 'Route not found' });
    res.status(200).json({ success: true, message: 'Route updated successfully', data: updatedRoute });
  } catch (error) { next(error); }
};

export const deleteRoute = async (req, res, next) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ success: false, message: 'Route not found' });
    res.status(200).json({ success: true, message: 'Route deleted successfully' });
  } catch (error) { next(error); }
};