const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const dotenv = require('dotenv');

const router = express.Router();
dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

router.get('/profile', authMiddleware, (req, res) => {
  res.join({ message: 'User profile', userId: req.user.id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
