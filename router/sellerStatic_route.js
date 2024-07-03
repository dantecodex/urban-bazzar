import express from "express";
import {
    sellerAddProductPage, sellerDashboard, sellerHomepage,
    sellerListedProductPage, sellerLoginPage,
    sellerSignupPage
} from "../controllers/sellerStatic_controller.js";


const sellerStaticRouter = express.Router()

// Seller routes
sellerStaticRouter.route('/').get(sellerHomepage)
sellerStaticRouter.route('/signup').get(sellerSignupPage)
sellerStaticRouter.route('/login').get(sellerLoginPage)
sellerStaticRouter.route('/add-product').get(sellerAddProductPage)
sellerStaticRouter.route('/listed-product').get(sellerListedProductPage)
sellerStaticRouter.route('/dashboard').get(sellerDashboard)

export default sellerStaticRouter
