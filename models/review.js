import mongoose from "mongoose";

const reviewSchema =new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique :true
    },
    name : {
        type :String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    Comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required :true,
        default :Date.now()
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    },
    profilePicture : {
        type:String,
        required:true,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    }
});

const Review = mongoose.model("Review",reviewSchema);

export default Review;

