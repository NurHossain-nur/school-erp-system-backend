// src/routes/config/mappingRoutes.js
import express from 'express';
import { 
  getClassSectionMappings, 
  createClassSectionMapping, 
  getClassSectionMappingById, 
  updateClassSectionMapping,
  deleteClassSectionMapping,
  getClassGroupMappings, createClassGroupMapping, getClassGroupMappingById, 
  updateClassGroupMapping, deleteClassGroupMapping, copyClassGroupMapping,
  getClassSemesterMappings, createClassSemesterMapping, getClassSemesterMappingById, 
  updateClassSemesterMapping, deleteClassSemesterMapping, copyClassSemesterMapping,
  getClassSubjectMappings, createClassSubjectMapping, getClassSubjectMappingById, 
  updateClassSubjectMapping, deleteClassSubjectMapping, copyClassSubjectMapping
} from '../../controllers/config/mappingController.js';

const router = express.Router();

router.route('/class-section')
  .get(getClassSectionMappings)
  .post(createClassSectionMapping);

router.route('/class-section/:id')
  .get(getClassSectionMappingById)
  .put(updateClassSectionMapping)
  .delete(deleteClassSectionMapping);


// --- Class Group Mapping Routes ---
router.route('/class-group')
  .get(getClassGroupMappings)
  .post(createClassGroupMapping);

router.route('/class-group/:id')
  .get(getClassGroupMappingById)
  .put(updateClassGroupMapping)
  .delete(deleteClassGroupMapping);


// --- Class Semester Mapping Routes ---
router.route('/class-semester')
  .get(getClassSemesterMappings)
  .post(createClassSemesterMapping);

router.route('/class-semester/:id')
  .get(getClassSemesterMappingById)
  .put(updateClassSemesterMapping)
  .delete(deleteClassSemesterMapping);



// --- Class Subject Mapping Routes ---
router.route('/class-subject')
  .get(getClassSubjectMappings)
  .post(createClassSubjectMapping);

router.route('/class-subject/:id')
  .get(getClassSubjectMappingById)
  .put(updateClassSubjectMapping)
  .delete(deleteClassSubjectMapping);


  

router.post('/class-semester/:id/copy', copyClassSemesterMapping);

export default router;