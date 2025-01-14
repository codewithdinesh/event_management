const express = require("express");
const { auth } = require("../middleware/auth");
const createEvent = require("../controllers/events/create");
const app = express.Router();


app.get("/", (req, res) => {
    res.send("Event Route");
});


// Create a new Event
app.post("/create", auth, createEvent);


module.exports = app;
