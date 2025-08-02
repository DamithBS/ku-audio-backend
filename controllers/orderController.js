import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req,res) {
    const data = req.body;
    const orderInfo = {
        orderedItems: []
    }

    
    
    let oneDayCost = 0;  //total cost

    for(let i=0; i<data.orderedItems.length; i++){
       try{
           const product = await Product.findOne({key:data.orderedItems[i].key})
           if(product == null){
               res.status(404).json({
                   message:"Product with key " + data.orderedItems[i].key + " not found"
               })
               return;
           }
           if(product.availability == false){
               res.status(404).json({
                   message:"Product with key " + data.orderedItems[i].key + " is out of stock"
               });
               return;
           }  
           
           orderInfo.orderedItems.push({
                product : {
                    key : product.key,
                    name : product.name,
                    image : product.image[0],
                    price : product.price
                },
                quantity : data.orderedItems[i].qty
           })

           oneDayCost += product.price * data.orderedItems[i].qty;
       }
       catch(e){
           res.status(500).json({
               message:"Failed to create order"
           })
           return
       }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalAmount = oneDayCost * data.days;

    try{
          
        res.json({
            message : "order created successfully",
            total : orderInfo.totalAmount,
        })
    }
    catch(e){
        res.status(500).json({
            message: "Faild to create order"
        })
    }



}

export async function getQuote(req,res){
    const data = req.body;
    const orderInfo = {
        orderedItems: []
    }

    if(req.user == null){
        res.status(401).json({
            message:"Please login first"
        });
        return;
    }
    orderInfo.email = req.user.email;

    const lastOrder = await Order.find().sort({orderId:-1}).limit(1);
    if(lastOrder.length==0){
        orderInfo.orderId = "ORD0001";        
    }
    else{
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumberInString = lastOrderId.replace("ORD","");
        const lastOrderNumber = parseInt(lastOrderNumberInString);
        const currentOrderNumber = lastOrderNumber + 1;
        const formattedNumber = String(currentOrderNumber).padStart(4,"0");
        orderInfo.orderId = "ORD" + formattedNumber;
    }

    
    let oneDayCost = 0;  //total cost

    for(let i=0; i<data.orderedItems.length; i++){
       try{
           const product = await Product.findOne({key:data.orderedItems[i].key})
           if(product == null){
               res.status(404).json({
                   message:"Product with key " + data.orderedItems[i].key + " not found"
               })
               return;
           }
           if(product.availability == false){
               res.status(404).json({
                   message:"Product with key " + data.orderedItems[i].key + " is out of stock"
               });
               return;
           }  
           
           orderInfo.orderedItems.push({
                product : {
                    key : product.key,
                    name : product.name,
                    image : product.image[0],
                    price : product.price
                },
                quantity : data.orderedItems[i].qty
           })

           oneDayCost += product.price * data.orderedItems[i].qty;
       }
       catch(e){
           res.status(500).json({
               message:"Failed to create order"
           })
           return
       }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalAmount = oneDayCost * data.days;

    try{
        const newOrder = new Order(orderInfo);
        const result= await newOrder.save();
        res.json({
            message : "order created successfully",
            order : result
        })
    }
    catch(e){
        res.status(500).json({
            message: "Faild to create order"
        })
    }



}