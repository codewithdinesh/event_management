require("dotenv").config();

const express = require('express')
const app = express();
var cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const adminRoutes = require('./routes/admin.routes');
const analyticsRoutes = require('./routes/analytics.routes');
// const router = require('./routes/routes')


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// app.use('/', router);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(8001, (req, res) => {
    console.log("Server Started..")
})