const express = require("express");
const getAllUsers = require("../controllers/admin/fetchUsers");
const app = express.Router();

const { auth, isAdmin } = require("../middleware/auth");
const getAllEvents = require("../controllers/admin/fetchEvents");
const deleteUser = require("../controllers/admin/deleteUser");


app.get("/", (req, res) => {
    res.send("Admin Routes");
});

// fetch all users
app.get("/users", auth, isAdmin, getAllUsers);

// fetch all events
app.get("/events", auth, isAdmin, getAllEvents);

// delete user 
app.delete("/users/:id", auth, isAdmin, deleteUser);


module.exports = app;
