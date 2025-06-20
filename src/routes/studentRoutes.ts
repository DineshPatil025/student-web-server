import express, { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';

const router = express.Router();

// Register student
router.post('/register', async (req, res) => {
  try {
    const student: IStudent = new Student(req.body);
    const saved = await student.save();
    res.status(201).json({
        success: true,
        data: saved,
        message: "Student registered successfully"
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all students
router.get('/getAllStudents', async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json({
        success:true,
        data: students,
        message: "Students fetched successfully"

    });
  } catch (error: any) {
    res.status(500).json({ 
        success:false,
        error: error.message,
        message: "Failed to fetch students"
     });
  }
});


// Delete student by ID
router.delete('/deleteStudent/:id', async (req: any, res: any) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      data: deletedStudent,
      message: "Student deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to delete student"
    });
  }
});

// Update student by ID
router.put('/updateStudent/:id', async (req: any, res: any) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      data: updatedStudent,
      message: "Student updated successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update student"
    });
  }
});

export default router;
