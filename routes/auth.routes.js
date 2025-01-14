const express = require("express");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");


const app = express.Router();


app.get("/", (req, res) => {
    res.send("Auth Route");
});

app.post("/register", register);

app.post("/login", login);


module.exports = app;
