var express = require('express');
var router = express.Router();

// Gives access to the functions in database.js
var db = require("../database");

router.post('/addNew', function(req, res) {
  db.addUser("NAME", database, "groupmembers")
});

//request to update isMaker
router.patch("/isMaker", function(req, res){
  var email = req.body.email
  var isMaker = req.body.isMaker;
  db.updateisMaker(email,database,isMaker,function(message) {
    var status = message
    res.json(status)
  })
});

//request to update user profile
router.patch("/", function(req,res){
  var email = req.body.email;
  var shortbio = req.body.shortbio;
  db.updateUser(email,shortbio,database,function(message) {
    var status = message
    res.json(status)
  })
});

//reqest to update maker profile
router.patch('/maker', function(req,res) {
  var email = req.body.email
  var makerLongBio = req.body.profiles.maker.longBio
  var makerPhotos = req.body.profiles.maker.photos
  var makerIcon = req.body.profiles.maker.icons
  db.updateProfile(email,makerLongBio,makerPhotos,makerIcon,database,'maker',function(message) {
    var status = message
    res.json(status)
  })
});

router.patch('/backer', function(req,res) {
  var email = req.body.email
  var backerLongBio = req.body.profiles.backer.longBio
  var backerPhotos = req.body.profiles.backer.photos
  var backerIcon = req.body.profiles.backer.icons
  db.updateProfile(email,backerLongBio,backerPhotos,backerIcon,database,'backer',function(message) {
    var status = message
    res.json(status)
  })
})

// POST request to create user in database
router.post("/", function(req, res) {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var isMaker = req.body.isMaker;
  var shortBio = req.body.shortBio;
  var location = req.body.location;

  var makerLongBio = req.body.profiles.maker.longBio
  var makerPhotos = req.body.profiles.maker.photos
  var makerIcon = req.body.profiles.maker.icons
  var makerSwipedRight = req.body.profiles.maker.swipedright
  var makerMatches = req.body.profiles.maker.matches
  var makerSwipedOn = req.body.profiles.maker.swipedon

  var backerLongBio = req.body.profiles.backer.longBio
  var backerPhotos = req.body.profiles.backer.photos
  var backerIcon = req.body.profiles.backer.icons
  var backerSwipedRight = req.body.profiles.backer.swipedright
  var backerMatches = req.body.profiles.backer.matches
  var backerSwipedOn = req.body.profiles.backer.swipedon
  db.createUser(name,age,email,isMaker,shortBio,"users", database);
  db.createUserProfile(makerLongBio,makerPhotos,makerIcon,email,"maker",
                       makerSwipedRight,makerMatches,makerSwipedOn, database)
  db.createUserProfile(backerLongBio,backerPhotos,backerIcon,email,"backer",
                       backerSwipedRight,backerMatches,backerSwipedOn,database)
  res.json(req.body);
});



// GET request to read user from database
router.get('/', function(req, res) {
  var email = req.query && req.query.email
  var user = db.readUser(email, 'users', database, function(user) {
    if (user != null) {
      console.log("GOT USER: " + user.email)
    } else {
      console.log("NO USER " + email)
    }
    res.json(user);
  })
});

// GET request to read maker from database
router.get('/maker', function(req, res) {
  var email = req.query && req.query.email
  var user = db.readUserProfile(email, 'maker', database, function(user) {
    if (user != null) console.log("GOT MAKER USER: " + user.email)
   res.json(user);
  })
});

// GET request to read backer profile from database
router.get('/backer', function(req, res) {
  var email = req.query && req.query.email
  var user = db.readUserProfile(email, 'backer', database, function(user) {
    if (user != null) console.log("GOT USER in backer: " + user.email)
    res.json(user);
  })
});

//POST request to update swipedRight and swipedOn
router.post("/swipe", function(req, res){

    var email = req.body.email;//email of user doing the swiping
    var swipedEmail = req.body.swipedEmail;//email of user being swiped on
    var isMaker = req.body.isMaker;
    var swipedRight = req.body.swipedRight;//boolean val, true if swiped right


    db.addSwipe(email, isMaker, swipedEmail, swipedRight, database, function(user){
      res.json(req.body);
    });


});

router.post("/settings/create", function(req, res) {
  var isVisible = req.body.isVisible;
  var blockedUsers = req.body.blockedUsers;
  var email = req.body.email;
  db.createSettings(isVisible, blockedUsers, email, database)
  res.json(req.body)
});

router.post("/settings", function(req, res) {

  var isVisible = req.body.isVisible;
  var blockedUsers = req.body.blockedUsers;
  //var email = "brandonisadumdum@msn.com"
  var email = req.body.email


  db.updateSettings(isVisible, blockedUsers, email, database, function(message) {
    var status = message
    res.json(status);
  })
});

router.get('/settings', function(req, res) {
  var email = req.query && req.query.email
  var settings = db.readSettings(database, email, function(user_settings) {
    if (user_settings != null) console.log("GOT settings from: " + email)
    res.json(user_settings);
  })
});


module.exports = router;
