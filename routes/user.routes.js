const express = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const { auth } = require("../middleware/auth");
const fetchUser = require("../controllers/user/fetchUser");
const updateUser = require("../controllers/user/updateUser");


const app = express.Router();

app.get("/", (req, res) => {
    res.send("User Route");
});

app.post("/register", register);

app.post("/login", login);

// Fetch
app.get("/:id", auth, fetchUser);

// Update
app.put("/:id", auth, updateUser)




module.exports = app;
