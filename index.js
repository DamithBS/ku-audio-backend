import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


import userRouter from "./routes/userRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import productRoute from "./routes/productRoute.js";
import inquiryRoute from "./routes/inquiryRoute.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    let token = req.header("Authorization")

    if (token!=null){
        token=token.replace("Bearer ","")

        jwt.verify(token, process.env.JWT_SECRET,
            (err,decoded) => {
                if(!err){                  
                    req.user=decoded             
                }
            }
        )
    }
    next()
});



let mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl);

const connection = mongoose.connection

connection.once("open",() => {
    console.log("Connection create Connect successful ......");   
})


app.use("/api/users",userRouter);
app.use("/api/reviews",reviewRouter)
app.use("/api/products",productRoute)
app.use("/api/inquirys",inquiryRoute)


app.listen(3000, () => {
    console.log("server is runing...");    
});
