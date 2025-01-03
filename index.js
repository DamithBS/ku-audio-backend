import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

let mongourl = "mongodb+srv://Admin:1234@cluster0.erezo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongourl);

const connection = mongoose.connection

connection.once("open",() => {
    console.log("Connection create successful Connect......");   
})


app.use("/api/users",userRouter)


app.listen(3000, () => {
    console.log("server is runing...");    
});
