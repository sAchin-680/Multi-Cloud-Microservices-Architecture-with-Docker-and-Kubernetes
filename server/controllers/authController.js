const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  const errors = validatorResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Validdation failed for registration', {
      errors: errors.array(),
    });
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    consthashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
  } catch (error) {
    logger.error('User registration failed', { error });
    return res.status(500).json({ message: `Internal Server error` });
  }
};

exports.login = async (req, res) => {
  const error = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Validation failed for login', {
      errors: errors.array(),
    });
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn('User not found');
      return res.status(404).json({ message: 'User not found' });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.warn('Login failed: Invalid Credentials', { username });
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      logger.info('User logged in successfully', { username });
      return res.status(200).json({ token });
    }
  } catch (error) {
    logger.error('User login failed', { error });
    return res.status(500).json({ message: `Internal Server error` });
  }
};
