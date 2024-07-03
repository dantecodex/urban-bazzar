import express from "express"
import { addProduct, addToCart, deleteProduct, removeFromCart, toggleProduct } from "../controllers/product_controller.js"
import upload from "../middlewares/multer.js"

const productRouter = express.Router()

productRouter.route('/addProduct').post(upload.single('productImage'), addProduct)
productRouter.route('/toggleProduct').post(toggleProduct)
productRouter.route('/deleteProduct').post(deleteProduct)
productRouter.route('/addToCart').post(addToCart)
productRouter.route('/removeFromCart').post(removeFromCart)

export default productRouter