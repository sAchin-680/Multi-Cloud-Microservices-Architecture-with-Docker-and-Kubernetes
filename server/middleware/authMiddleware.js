const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authMidleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' '[1]);

  if (!token) {
    logger.warn('No token provided');
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Invalid token', { error });
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMidleware;
