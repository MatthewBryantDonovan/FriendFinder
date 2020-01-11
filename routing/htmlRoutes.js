var express = require('express')
var router = express.Router()
var path = require("path");

// Routes
// =============================================================
// Route that sends the user first to the home Page
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

// Route that sends the user to the survey Page
router.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

module.exports = router;