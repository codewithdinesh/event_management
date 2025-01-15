require("dotenv").config();

const express = require('express')
const app = express();
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./libs/connectDB');

// Routes
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const adminRoutes = require('./routes/admin.routes');
const analyticsRoutes = require('./routes/analytics.routes');
// const router = require('./routes/routes')


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// Database Connection
connectDB();



// app.use('/', router);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(8001, (req, res) => {
    console.log("Server Started..")
})