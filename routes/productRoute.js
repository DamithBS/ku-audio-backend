import express from "express"
import { addProduct, deleteProduct, getproduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/",addProduct)
productRoute.get("/",getProducts)
productRoute.put("/:key",updateProduct)
productRoute.delete("/:key",deleteProduct)
productRoute.get("/:key",getproduct)


export default productRoute;