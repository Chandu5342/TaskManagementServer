// validation/taskValidation.js
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Pending", "Completed", "InProgress"]).optional(),
  assignedTo: z.string().optional(), // MongoDB ObjectId as string
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Pending", "Completed", "InProgress"]).optional(),
  assignedTo: z.string().optional(),
});
