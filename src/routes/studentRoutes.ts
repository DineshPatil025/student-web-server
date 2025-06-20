import express from 'express';
import {
  registerStudent,
  getAllStudents,
  deleteStudent,
  updateStudent
} from '../controllers/studentController';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/getAllStudents', getAllStudents);
router.delete('/deleteStudent/:id', deleteStudent);
router.put('/updateStudent/:id', updateStudent);

export default router;
