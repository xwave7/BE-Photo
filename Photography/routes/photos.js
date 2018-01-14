var express = require("express");
var router = express.Router();
var Photo  = require("../models/photo");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// INDEX - show all photos
router.get("/", function(req, res) {
    //Get all photos from DB
    Photo.find({},function(err, allPhotos){
        if(!err){
            res.render("photos/index", {photos:allPhotos, currentUser: req.user});
        }
        else console.log(err);
    })
});

// Create Route
router.post("/", function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    }
    var newPhoto = {name:name, price: price, image:image, description:desc, author: author};
    //Create a new photo and save to DB
    Photo.create(newPhoto,function(error, newlyCreated){
        if(error){
            console.log(error);
        }
        else {
            res.redirect("/photos");
        }
    });
})

// New Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    req.flash("error", "You need to be logged in to do that!");
    res.render("photos/new");
})

//Show - shows more info about one photo
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    //find the photo with provided ID
    Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
        if(err)
            console.log(err);
        else{
            //render show template with that photo
            res.render("photos/show", {photo: foundPhoto});
        }
    });
})

// EDIT PHOTO ROUTE
router.get("/:id/edit",middleware.checkPhotoOwnership,function(req, res){
    Photo.findById(req.params.id, function(err, foundPhoto){
        if(err) res.redirect("/photos");
        else {
            res.render("photos/edit", {photo: foundPhoto})
        }
    });
})

// UPDATE PHOTO ROUTE
router.put("/:id", middleware.checkPhotoOwnership, function(req, res){
    // find and update the correct photo
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err) res.redirect("/photos");
        else {
            res.redirect("/photos/" + req.params.id);
        }
    });
});

// DESTROY PHOTO ROUTE
router.delete("/:id", middleware.checkPhotoOwnership, function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err) res.redirect("/photos");
        else {
            res.redirect("/photos");
        }
    })
})

module.exports = router;