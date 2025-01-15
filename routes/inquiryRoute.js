import express from "express";
import { addInquiry, deleteInqury, getInquiries, updateInquiry } from "../controllers/inquiryController.js";

const inquiryRoute = express.Router();

inquiryRoute.post("/",addInquiry)
inquiryRoute.get("/",getInquiries)
inquiryRoute.delete("/:id",deleteInqury)
inquiryRoute.put("/:id",updateInquiry)

export default inquiryRoute;