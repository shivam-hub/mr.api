const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const jwtMiddleware = require('./middleware/jwtMiddleware')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
