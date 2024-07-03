import express from "express"
import {
    addAddressPage,
    browseProductPage, homepage,
    loginPage, orderHistoryPage, paymentSuccessPage,
    shoppingCartCheckoutPage,
    shoppingCartPage, signupPage
} from "../controllers/static_controller.js"

const staticRouter = express.Router()

// User routes
staticRouter.route('/').get(homepage)
staticRouter.route('/login').get(loginPage)
staticRouter.route('/signup').get(signupPage)
staticRouter.route('/browse-products').get(browseProductPage)
staticRouter.route('/cart').get(shoppingCartPage)
staticRouter.route('/cart/checkout').get(shoppingCartCheckoutPage)
staticRouter.route('/address').get(addAddressPage)
staticRouter.route('/payment-success').get(paymentSuccessPage)
staticRouter.route('/order-history').get(orderHistoryPage)


export default staticRouter