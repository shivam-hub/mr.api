const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const visitRoutes = require('./routes/visitRoutes');
const scheduleVisitRoutes = require('./routes/scheduleVisitRoutes');
const productsRoutes = require('./routes/productRoutes');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/Auth', authRoutes);
app.use('/api/Users', userRoutes);
app.use('/api/Doctor', doctorRoutes);
app.use('/api/Visits', visitRoutes);
app.use('/api/ScheduleVisit', scheduleVisitRoutes);
app.use('/api/Products', productsRoutes);

connectDB();

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
