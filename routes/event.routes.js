const express = require("express");
const { auth } = require("../middleware/auth");
const createEvent = require("../controllers/events/create");
const getEvents = require("../controllers/events/fetchEvents");
const getEventById = require("../controllers/events/fetchEvent");
const { updateEvent, deleteEvent } = require("../controllers/events/updateEvent");
const registerForEvent = require("../controllers/registration/eventRegistration");
const cancelRegistration = require("../controllers/registration/cancelRegistration");

const getEventAttendees = require("../controllers/registration/fetchAttendees");
const app = express.Router();


app.get("/", getEvents);


// Create a new Event
app.post("/create", auth, createEvent);

// Get a single Event
app.get('/:id', getEventById);

// Update an Event
app.put('/:id', auth, updateEvent);

// Delete an Event
app.delete('/:id', auth, deleteEvent);

// event registration
app.post('/:id/register', auth, registerForEvent);

// cancel registration
app.post('/:id/cancel', auth, cancelRegistration);

// Get all attendees for an event
app.get('/:id/attendees', getEventAttendees);



module.exports = app;
