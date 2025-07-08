import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export const register = [
  body('name', 'The maximum name length is 200 characters').isLength({ min: 0, max: 200 }),
  body('customId', 'Invalid characters in the id').matches(/^[a-zA-Z0-9-_]{0,35}$/),
  body('email', 'This is not email').isEmail().isLength({ max: 100 }),
  body('password', 'Invalid characters in the password').matches(/^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/),
];

export const logIn = [
  body('email', 'This is not email').isEmail().isLength({ max: 100 }),
  body('password', 'Invalid characters in the password').matches(/^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/),
];

export const createPost = [
  body('title', 'Maximum title size 220 characters').isLength({ min: 0, max: 220 }).isString(),
  body('text', 'Maximum text size 75000 characters').isLength({ min: 0, max: 75000 }).isString(),
];

export const errors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
  
};