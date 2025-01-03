import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
                        lastNamr : user.lastName,
                        email : user.email,
                        role : user.role
                    },"ku-secret-55#")
                    res.json({message:"password is correct",token:token})
                }
                else{
                    res.status(401).json({error:"password is incorrect"})
                }
            }
        }
    )

}