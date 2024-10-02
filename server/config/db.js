const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    logger.error('Mongo URI is not defined in environment variables.');
    throw new Error('MongoDB URI not defined');
  }
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB Connected Successfully');
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
