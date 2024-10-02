// src/index.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Other middleware and route setups...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
