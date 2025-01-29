import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export function registerUser(req,res){

    const data =req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser =new User (data);

    newUser.save().then( () => {
        res.json({
            message: "User created successfully"})
    })
    .catch(error => {
        res.status(500).json({
            error:"User registration faild"
        })
    })
}

export function loginUser(req,res){

    const data = req.body;

    User.findOne({
        email:data.email
    })
    .then(
        (user) => {
            
            if(user == null){
                res.status(404).json({error:"user not found"})
            }
            else{
                const isPasswordCorrect =bcrypt.compareSync(data.password,user.password)
                if(isPasswordCorrect){
                    const token = jwt.sign({
                        fristName : user.fristName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role,
                        profilePicture : user.profilePicture,
                        phone : user.phone,
                    },process.env.JWT_SECRET)
                    res.json({message:"login Successful",token:token, user:user})
                }
                else{
                    res.status(401).json({error:"password is incorrect"})
                }
            }
        }
    )

}


//user check admin or customer function  create

export function isItAdmin(req){
    
    let isAdmin = false;

    if(req.user != null && req.user.role == "admin"){
        isAdmin=true;
    }
    return isAdmin;
}


///check customer function

export function isItCustomer(req){
    
    let isCustomer = false;

    if(req.user != null && req.user.role == "customer"){
        isCustomer=true;
    }
    return isCustomer;
}