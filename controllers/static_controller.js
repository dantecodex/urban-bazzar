import Cart from "../models/cart_models.js";
import Product from "../models/product_models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const homepage = asyncErrorHandler(async (req, res) => {
    res.render('homepage', { user: req.user })
})

const loginPage = asyncErrorHandler(async (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }

    res.render("login")
})

const signupPage = asyncErrorHandler(async (req, res) => {
    res.render("signup")
})

const browseProductPage = asyncErrorHandler(async (req, res) => {
    const user = req.user
    const products = await Product.find({ active: true, stockQuantity: { $gt: 0 } })
    // const cart = await Cart.findOne({ userID: user._id })
    // console.log(user);

    res.render("browse_products", { user, products })
})

const shoppingCartPage = asyncErrorHandler(async (req, res) => {
    const cart = req.user.cart
    res.render("shopping_cart", { user: req.user, cart })
})

const shoppingCartCheckoutPage = asyncErrorHandler(async (req, res) => {
    const address = req.user.address
    res.render("checkout", { user: req.user, address })
})

const paymentSuccessPage = asyncErrorHandler(async (req, res) => {
    res.render("payment_successfull", { user: req.user })
})

const addAddressPage = asyncErrorHandler(async (req, res) => {
    const address = req.user.address
    res.render("user_address", { user: req.user, address })
})

const orderHistoryPage = asyncErrorHandler(async (req, res) => {
    const orderHistory = req.user.orderHistory

    res.render("order_history", { user: req.user, orderHistory })
})

export {
    homepage, loginPage, signupPage,
    browseProductPage, shoppingCartPage,
    paymentSuccessPage, addAddressPage,
    shoppingCartCheckoutPage, orderHistoryPage
}