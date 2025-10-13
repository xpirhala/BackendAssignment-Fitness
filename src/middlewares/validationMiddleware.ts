import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Example validation using express-validator

export const validateUser = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("nickName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Nickname must be at least 2 characters"),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("surname")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Surname must be at least 2 characters"),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .isString()
    .withMessage("Password must be provided"),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];