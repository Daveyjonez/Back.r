var express = require('express');
var router = express.Router();

// POST request to create user 
router.post("/", function(req, res) {
  console.log("Hello  " + req.body + '\n');
  res.json(req.body);
});

router.get('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
    res.json({
        "user" : "test_user",
        "isMaker" : true,
        "shortBio" : "this is the shorter bio.",
        "age" : 21,
        "profiles" : {
            "maker" : {
              longBio: "this is the maker long bio",  
                photos: "",
                icon: true,
            },
            "backer" : {
             longBio: "this is the backer long bio",  
                photos: "",
                icon: true,   
            }
        }
    });
});

module.exports = router;