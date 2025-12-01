import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import { createTaskSchema, updateTaskSchema } from '../validation/taskValidation.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {getMyTasks,getAssignedTasks,getTaskById,createTask,updateTask,deleteTask} from '../controllers/taskController.js';
import { fileURLToPath } from 'url';
import { validate } from '../middlewares/validate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Setup multer for document upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});

const upload = multer({ storage });

// Task Routes

// Get tasks created by logged-in user
router.get('/mytasks', protect, getMyTasks);

// Get tasks assigned to logged-in user
router.get('/assigned', protect, getAssignedTasks);

// Get task by ID
router.get('/:id', protect, getTaskById);

// Create new task (max 3 files)
router.post('/', protect, upload.array('documents', 3), validate(createTaskSchema), createTask);

// Update existing task (max 3 files)
router.put('/:id', protect, upload.array('documents', 3), validate(updateTaskSchema), updateTask);

// Delete task
router.delete('/:id', protect, deleteTask);

export default router;
