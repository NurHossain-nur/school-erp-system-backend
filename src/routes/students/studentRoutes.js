// src/routes/students/studentRoutes.js
import express from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, createBulkStudents, getMaxRoll, bulkUpdatePhotos, bulkUpdateGeneral, bulkDeleteStudents, updateProcessCodes, migrateStudents, migrateSemester } from '../../controllers/students/studentController.js';

const router = express.Router();
router.route('/bulk').post(createBulkStudents);
router.route('/max-roll').get(getMaxRoll);
router.route('/bulk-photo').put(bulkUpdatePhotos);

router.route('/bulk-update-general').put(bulkUpdateGeneral);
router.route('/bulk-delete').post(bulkDeleteStudents);

router.route('/bulk-process-code').put(updateProcessCodes);
router.route('/migrate').post(migrateStudents);
router.route('/migrate-semester').post(migrateSemester);

router.route('/').get(getStudents).post(createStudent);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;
