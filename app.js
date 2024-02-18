const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const visitRoutes = require('./routes/visitRoutes');
const scheduleVisitRoutes = require('./routes/scheduleVisitRoutes');
const productsRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/Auth', authRoutes);
app.use('/api/Users', userRoutes);
app.use('/api/Doctor', doctorRoutes);
app.use('/api/Visits', visitRoutes);
app.use('/api/ScheduleVisit', scheduleVisitRoutes);
app.use('/api/Products', productsRoutes);
app.use('/api/Uploads', uploadRoutes);

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
