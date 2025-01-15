import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

//add inquiry

export async function addInquiry(req,res) {
    
    try {
        if(isItCustomer(req)){
            const data = req.body

            data.email= req.user.email
            data.phone=req.user.phone

            let id = 0

            const inquiryes = await Inquiry.find().sort({id:-1}).limit(1)

            if(inquiryes.length == 0){
                id = 1;
            }
            else{
                id = inquiryes[0].id + 1;
            }

            data.id=id

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message:"Inquiry added successfully",
                id:response.id
            })
        }

        else{
            res.json({
                message:"You are not a customer"
                })
            }
    }
    catch (e) {
        res.status(500).json({ 
            message: "Error adding inquiry" 
        });
    }
        
}


///show inquiry 

export async function getInquiries(req,res) {
    try{

        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({
                email:req.user.email
            })
            res.json(inquiries)
            return
        }
        else if(isItAdmin(req)) {
            const inquiries =await Inquiry.find()
            res.json(inquiries);
            return
        }
        else{
            res.status(405).json({
                message:"Your are not authorized to perform this action"
                });
            }
            return
        }

    
    catch(e){
        res.status(500).json({ 
            message: "Error view inquiry" 
        });
    }
    
}

//delete inquiry

export async function deleteInqury(req,res) {
    try{
        if(isItAdmin(req)){
            const id = req.params.id;

            await Inquiry.deleteOne({id:id})
            res.json({
                message:"Inquery delete successsfully"
            })
        }
        else if(isItCustomer(req)){
            const id = req.params.id;

            const inquiry = await Inquiry.findOne({id:id})
            if(inquiry==null){
                res.status(404).json({
                    message:"inquiry not found"
                })
                return
            }
            else{
                if(inquiry.email == req.user.email){   //check for coustermer email and req email are same
                    await Inquiry.deleteOne({id:id})
                    res.json({
                        message:"Inquery delete successsfully"
                    })
                }
                else{
                    res.status(405).json({
                        message:"Your are not authorized to perform this action"
                        });
                    }
                    return
                }
            }
        
        else{
            res.status(405).json({
                message:"Your are not authorized to perform this action"
                });
            } 
            return 
        }
    
    catch(e){
        res.status(500).json({ 
            message: "Error Delete inquiry" 
        })
    }
    
}

//update inquriy

export async function updateInquiry(req,res) {
    try{
        if(isItAdmin(req)){
            const id =req.params.id;
            const data = req.body;

            await Inquiry.updateOne({id:id},data)
            res.json({
                message:"Inquiry Update Successfully"
            })
        }else if(isItCustomer(req)){
            const id =req.params.id;
            const data = req.body; 

            const inquiry = await Inquiry.findOne({id:id})

            if(inquiry == null){
                res.status(404).json({
                     message:"inquiry not found"
                });
                return
            }
            else{
                if(inquiry.email == req.user.email){

                    await Inquiry.updateOne({id:id},{message:data.message})
                    res.json({
                        message:"Inquriy update sucessfull"
                    });
                    return
                }
                else{
                    res.status(405).json({
                        message:"Your are not authorized to perform this action"
                        });
                    return
                }
            }

        }
        else{
            res.status(405).json({
                message:"Your are not authorized to perform this action"
                });
            return 
        }
    }
    
    catch(e){
        res.status(500).json({ 
            message: "Error Update inquiry" 
        })
    }
}