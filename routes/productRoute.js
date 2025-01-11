import express from "express"
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/",addProduct)
productRoute.get("/",getProduct)
productRoute.put("/:key",updateProduct)
productRoute.delete("/:key",deleteProduct)


export default productRoute;