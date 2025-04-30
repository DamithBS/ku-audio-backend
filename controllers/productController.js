import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

//add product

export async function addProduct(req,res){

    try{

        if(req.user == null){
            res.status(401).json({
                message : "Please login and try again"
            })
            return;
        }

        if(req.user.role != "admin"){
            res.status(401).json({
                message : "Your are not authorized to perform this action"
            })
            return
        }

        const data = req.body;
        const newProduct = new Product(data);
    
        try{
            await newProduct.save();
            res.json({
                message:"Product added successfully"
            })
        }
        catch(error){
            res.status(500).json({
                error:"product added fail"
            })
        }
    }

    catch(error){
        res.status(500).json({
            error:"Internal Server Error"
            })
    }

}


//show product list 

export async function getProducts(req,res) {


    try{

        if(isItAdmin(req)){
            const product = await Product.find()
            res.json(product)
            return;
        }
        else{
            const product =await Product.find({availability:true})
            res.json(product);
            return
        }

    }

    catch(e){
        res.status(500).json({
            message:"Failed to get product"
        })

    }
    
}

//update product 
export async function updateProduct(req,res) {

    try{
        if(isItAdmin(req)){

            const key = req.params.key;

            const data = req.body;

            await Product.updateOne({key:key},data)

            res.json({
                message:"Product updated successfully"
            })
            return;
        }
        else{
            res.status(403).json({
                message:"You are not authorized to update product"
            })
    }
  

    }

    catch(e){
        res.status(500).json({
            message:"Failed to update product"
            })
    }
    
}



//delete product
export async function deleteProduct(req,res) {
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key:key})
            res.json({
                message:"Product deleted successfully"
                })
        }
        else{
            res.status(403).json({
                message:"You are not authorized to delete product."
                })
        }
    }
    catch(e){
        res.status(500).json({
            message:"Failed to delete product"
            })
    }
    
}

export async function getproduct(req,res) {
    try{
        const key = req.params.key;
        const product = await Product.findOne({key:key})
        if(product == null){
            res.status(404).json({
                message:"Product not found"
                })
            return;
        }
            res.json(product)
        return;
    }
    catch(e){
        res.status(500).json({
            message:"Failed to get product"
            })
     
    }
       
    
}