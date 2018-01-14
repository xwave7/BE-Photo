var Photo = require("../models/photo");
var Comment = require("../models/comment");

var middlewaresObj = {};

middlewaresObj.checkPhotoOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Photo.findById(req.params.id, function(err, foundPhoto){
            if(err) {
                req.flash("error", "Photo not found");
                res.redirect("back");
            }
            else {
                // check the author's ID
                if(foundPhoto.author.username == (req.user.username)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewaresObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else {
                // check the author's ID
                if(foundComment.author.username == (req.user.username)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewaresObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewaresObj;