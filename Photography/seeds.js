var mongoose   = require("mongoose"),
    Photo = require("./models/photo"),
    Comment    = require("./models/comment");
    
var data = [
    {
         name:"Cloud's Rest", 
         image: "http://amherstma.gov/calendar/tent_camping.jpg",
         description: "This is a huge granite hill, no bathrooms. No water, beautiful granite!"
    },
    {
         name:"Desert Mesa", 
         image: "https://i.cbc.ca/1.3928992.1484065378!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/tunnel-mountain-village-i-campground-banff.jpg",
         description: "This is a huge granite hill, no bathrooms. No water, beautiful granite!"
    },
    {
         name:"Canyon Floor", 
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBORSqt_AQxN5MbmtvK2aLSPpm8ohbLHQy1thj-DygsbAAmlM",
         description: "This is a huge granite hill, no bathrooms. No water, beautiful granite!"
    }
]

function seedDB(){
    //remove all photos
    Photo.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed photos!");
        //add a few photos
        data.forEach(function(seed){
            Photo.create(seed, function(err, photo){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Added a photo");
                    //add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author:"Homer"
                        }, function(err, comment){
                            if(err) console.log(err);
                            else {
                                photo.comments.push(comment);
                                photo.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;
