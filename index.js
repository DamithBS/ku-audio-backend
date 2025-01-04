import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());



let mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl);

const connection = mongoose.connection

connection.once("open",() => {
    console.log("Connection create successful Connect......");   
})


app.use("/api/users",userRouter)


app.listen(3000, () => {
    console.log("server is runing...");    
});
