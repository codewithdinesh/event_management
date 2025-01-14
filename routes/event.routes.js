const express = require("express");
const app = express.Router();


app.get("/", (req, res) => {
    res.send("Event Route");
});


module.exports = app;
