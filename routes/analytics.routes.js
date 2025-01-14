const express = require("express");
const app = express.Router();


app.get("/", (req, res) => {
    res.send("Analytics Route");
});


module.exports = app;
