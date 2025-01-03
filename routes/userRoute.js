import express from "express";
import { loginUser, registerUser } from "../controllers/userController";


const userRouter = express.Router();

userRouter.post("/",registerUser);

userRouter.post("/login",loginUser);

export default userRouter