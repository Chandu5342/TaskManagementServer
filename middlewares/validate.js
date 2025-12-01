// middlewares/validate.js
import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    // If Zod validation error
    if (err instanceof ZodError && Array.isArray(err.errors)) {
      const errors = err.errors.map((e) => e.message);
      return res.status(400).json({
        message: 'Validation error',
        errors,
      });
    }

    // Fallback for other errors
    return res.status(400).json({
      message: 'Validation error',
      errors: [err.message || 'Invalid request'],
    });
  }
};
