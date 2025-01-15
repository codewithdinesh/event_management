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
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Management System API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
                .container {
                    background: #fff;
                    padding: 20px 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
               
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Event Management System API</h1>
                <p>
                    This API provides endpoints to manage events, users, and much more. 
                    Whether you are building an event platform or integrating event data, 
                    our API offers a robust solution.
                </p>
                <a href="https://documenter.getpostman.com/view/28173999/2sAYQXptdE" target="_blank">View API Documentation</a>
            </div>
        </body>
        </html>
    `);
});


app.listen(8001, (req, res) => {
    console.log("Server Started..")

})