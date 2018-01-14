var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register")
})

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to B&E Photo! "+ user.username);
            res.redirect("/photos");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
})

// handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/photos",
        failureRedirect: "/login"
    })
)

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Log you out!");
    res.redirect("photos");
})

module.exports = router;