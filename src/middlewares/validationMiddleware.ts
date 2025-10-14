import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { EXERCISE_DIFFICULTY, ROLE_TYPE } from '../utils/enums';

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


export const validateCreateExercise = [
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("difficulty")
    .isString()
    .isIn([EXERCISE_DIFFICULTY.EASY, EXERCISE_DIFFICULTY.MEDIUM, EXERCISE_DIFFICULTY.HARD])
    .withMessage("Difficulty must be one of the following: easy, medium, hard"),
  body("programID")
    .isInt({ gt: 0 })
    .withMessage("Program ID must be a positive integer"),
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

export const validateUpdateExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer"),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("difficulty")
    .isString()
    .isIn([EXERCISE_DIFFICULTY.EASY, EXERCISE_DIFFICULTY.MEDIUM, EXERCISE_DIFFICULTY.HARD])
    .withMessage("Difficulty must be one of the following: easy, medium, hard"),
  body("programID")
    .isInt({ gt: 0 })
    .withMessage("Program ID must be a positive integer"),
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

export const validateDeleteExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer"),
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


export const validateUpdateUser = [
  body("nickName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Nickname must be at least 2 characters"),
  body("name")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("surname")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Surname must be at least 2 characters"),
  body("role")
    .optional()
    .isString()
    .isIn([ROLE_TYPE.ADMIN, ROLE_TYPE.USER])
    .withMessage("Role must be either ADMIN or USER"),
  body("birthDate")
    .optional()
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage("Birthdate must be a valid date string"),
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