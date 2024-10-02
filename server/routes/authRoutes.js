const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// validation rules for registration
const registrationRules = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long.'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

// Validation rules for login
const loginRules = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long.'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

// Middleware to validate registration
const registrationValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware to validate login
const loginValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/register', registrationValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
