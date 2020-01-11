var express = require("express");
var router = express.Router()
var allFriends = require("../app/data/friends");
var path = require("path");

//Sets up the Express app to handle data parsing
router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

// Routes
// =============================================================
router.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});
// Displays all friends
router.get("/api/friends", function (req, res) {
    return res.json(allFriends);
});

//Create New Friend
router.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var matchObj = [];
    var currentTally = 0;
    var bestMatch = 9999;

    for (var friend = 0; friend < allFriends.length; friend++) {
        console.log(allFriends[friend]);
        
        for (var index = 0; index < newFriend.scores.length; index++) {
            if (allFriends[friend].scores[index] >= newFriend.scores[index]) {
                currentTally = currentTally + (allFriends[friend].scores[index] - newFriend.scores[index]);
            } else {
                currentTally = currentTally + (newFriend.scores[index] - allFriends[friend].scores[index]);
            };
        };
        console.log(currentTally);
        console.log(bestMatch);
        
        if (currentTally < bestMatch) {
            matchObj = [];
            bestMatch = currentTally;
            matchObj.push(allFriends[friend]);
        } else if(currentTally == bestMatch) {
            matchObj.push(allFriends[friend]);
        };

        currentTally = 0;
    };

    allFriends.push(newFriend);
    res.json(matchObj);

});


module.exports = router;