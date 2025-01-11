import Review from "../models/review.js";


//add review from user .
export async function addReview (req,res){

    try{

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

    await newReview.save() 
    res.json({
        message : "Review added successfully",
    })

    }

    catch{
        res.status(500).json({
            error:"Review additon failed"     
        });
    }

}

//show review from admin
export async function getReviews(req,res){

    try{
    const user = req.user;

    if(user == null || user.role != "admin"){
        const review = await Review.find({isApproved:true})
        res.json(review)
        return
    }

    if(user.role == "admin"){
        const review = await Review.find()
        res.json(review)
    }
   }

   catch(error){
    res.status(500).json({
        error:"Error fetching reviews."
        })
   }

}

/// delete rewiew from admin and custermer
export async function deleteReview(req,res){

    try{

    const email =req.params.email;

    if(req.user == null){
        res.status(401).json({
            message:"Please login and try again"
        });
        return
    }

    if(req.user.role =="admin"){

        await Review.deleteOne({email:email})
        res.json({
            message:"Review Delete Successful"
        })
        return
    }

    if(req.user.role=="customer"){


        if(req.user.email == email){

            await Review.deleteOne({email:email})
            res.json({
                message:"Review Delete Successful"
                })

        }
        else{
            res.status(403).json({
                message:"Review Delete faild"
            });
        }
    }

    }

    catch{
        res.status(500).json({
            error:"Your are not authorized to perform this action"
            })
    }

}

//review approvel in admin ...
export async function approveReview(req,res){
    try{
    const email=req.params.email;

    if(req.user==null){
        res.status(401).json({
            message:"Please login and try again"
        })
        return
    }

    if(req.user.role =="admin"){

        await Review.updateOne({email:email,},{isApproved:true,})
        res.json({
            message:"Review Approved Successfully"
            })

    }

    else{
        res.status(403).json({
            message:"Your are not authorized to perform this action"
        })
    }

    }

    catch{
        res.status(500).json({
            error:"Internal Server Error"
            })
    }

}
