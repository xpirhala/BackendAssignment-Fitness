import { Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { EXERCISE_DIFFICULTY, ROLE_TYPE } from '../utils/enums';

// Example validation using express-validator

export const validateUser = [
  body("email")
    .isEmail()
    .withMessage((value, { req }) => req.t('emailInvalid')),
  body("password")
    .isLength({ min: 6 })
    .withMessage((value, { req }) => req.t('passwordInvalid')),
  body("nickName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('nickNameInvalid')),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('firstNameInvalid')),
  body("surname")
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('surnameInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage((value, { req }) => req.t('emailInvalid')),
  body("password")
    .isString()
    .withMessage((value, { req }) => req.t('passwordInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];


export const validateCreateExercise = [
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('exerciseNameInvalid')),
  body("difficulty")
    .isString()
    .isIn([EXERCISE_DIFFICULTY.EASY, EXERCISE_DIFFICULTY.MEDIUM, EXERCISE_DIFFICULTY.HARD])
    .withMessage((value, { req }) => req.t('exerciseDifficultyInvalid')),
  body("programID")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('programIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },

  
];

export const validateUpdateExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('exerciseIDInvalid')),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('exerciseNameInvalid')),
  body("difficulty")
    .isString()
    .isIn([EXERCISE_DIFFICULTY.EASY, EXERCISE_DIFFICULTY.MEDIUM, EXERCISE_DIFFICULTY.HARD])
    .withMessage((value, { req }) => req.t('exerciseDifficultyInvalid')),
  body("programID")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('programIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateDeleteExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('exerciseIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];


export const validateUpdateUser = [
  body("nickName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('nickNameInvalid')),
  body("name")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('firstNameInvalid')),
  body("surname")
    .isString()
    .isLength({ min: 2 })
    .withMessage((value, { req }) => req.t('surnameInvalid')),
  body("role")
    .optional()
    .isString()
    .isIn([ROLE_TYPE.ADMIN, ROLE_TYPE.USER])
    .withMessage((value, { req }) => req.t('roleInvalid')),
  body("birthDate")
    .optional()
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage((value, { req }) => req.t('birthDateInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateUpdateTrackingExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('exerciseIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateAddTrackingExercise = [
  body("exerciseID")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('exerciseIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateDeleteTrackingExercise = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('exerciseIDInvalid')),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];

export const validateQueryGetExercises = [
  query("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('pageInvalid')),
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage((value, { req }) => req.t('limitInvalid')),
  query("search")
    .optional()
    .isString()
    .withMessage((value, { req }) => req.t('searchInvalid')),
  query('id')
    .optional()
    .custom((value, { req }) => {
        const ids = value.split(',').map(Number);
        if (!ids.every(Number.isInteger)) {
          throw new Error(req.t('idInvalid'));
        }
        req.ids = ids; // store parsed IDs for later use
        return true;
      }),
  // Handle errors
  //@ts-ignore
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }
    next();
  },
];