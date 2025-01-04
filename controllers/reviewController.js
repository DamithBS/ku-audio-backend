import Review from "../models/review.js";

export function addReview (req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return;
    }

    const data = req.body;

    data.name = req.user.fristName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data)

    newReview.save().then( () =>{
        res.json({
            message:"Review added successful"
        })
    })
    .catch((error) => {
        res.status(500).json({
            error:"Review additon failed"     
        });
    });
}



export function getReviews(req,res){

    const user = req.user;

    if(user == null || user.role != "admin"){
        Review.find({
            isApproved : true
        }).then((reviews) => {
            res.json(reviews);
        })
        return
    }

    if(user.role == "admin"){
        Review.find().then((reviews) => {
            res.json(reviews);
            })
    }
}