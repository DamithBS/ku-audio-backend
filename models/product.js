import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    key :{
        type: String,
        required: true,
        unique:true
    },
    name :{
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        default:"uncategorized"
    },
    dimensions:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:[String],
        required:true,
        default:["https://cdn.pixabay.com/photo/2021/01/23/05/55/sound-board-5941736_1280.jpg"]
    }

})

const Product = mongoose.model("Product",productSchema)

export default Product;