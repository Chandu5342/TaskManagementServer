// validation/userValidation.js
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(['user', 'admin']),
});

export const updateUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
  role: z.enum(['user', 'admin']).optional(),
});
