import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"customer"
    },
    fristName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    profilePicture : {
        type:String,
        required:true,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    }
})

const User = mongoose.model("User",userSchema);

export default User;