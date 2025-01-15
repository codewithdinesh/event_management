const express = require("express");
const getPopularEvents = require("../controllers/analytics/popularEvents");
const getActiveUsers = require("../controllers/analytics/activeUsers");
const getEventStats = require("../controllers/analytics/eventStats");
const app = express.Router();


app.get("/", (req, res) => {
    res.send("Analytics Route");
});

// Popular Events
app.get("/events/popular", getPopularEvents);

// Active Users
app.get("/users/active", getActiveUsers);

// Event Stats
app.get("/events/:id/stats", getEventStats);


module.exports = app;
