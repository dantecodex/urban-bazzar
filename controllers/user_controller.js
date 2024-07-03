import Cart from "../models/cart_models.js";
import Order from "../models/order_models.js";
import Product from "../models/product_models.js";
import Seller from "../models/seller_models.js";
import User from "../models/user_models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";
import sendEmail from "../utils/email.js";

const addAddress = asyncErrorHandler(async (req, res) => {
    const { userID, ...address } = req.body

    const user = await User.findByIdAndUpdate(userID, { $set: { address } }, { new: true })
    if (!user) {
        throw new customError("Unable to find user for adding address", 400)
    }

    res.redirect('/cart/checkout')
})

const payment = asyncErrorHandler(async (req, res) => {

    const userOfCart = await User.findById(req.body.userID).populate("cart")
    if (!userOfCart) {
        throw new customError("Unable to find owner of the cart", 400)
    }

    const orderDetails = {
        userID: userOfCart._id,
        items: userOfCart.cart.items,
        totalPrice: userOfCart.cart.totalPrice,
        totalQuantity: userOfCart.cart.totalQuantity,
        userAddress: userOfCart.address
    }

    const newOrder = await Order.create(orderDetails)
    if (!newOrder) {
        throw new customError('Unale to place order', 400)
    }

    userOfCart.orderHistory.push(newOrder?._id)
    await userOfCart.save({ validateBeforeSave: false })

    // Remove user cart
    await Cart.findByIdAndDelete(userOfCart.cart._id)

    newOrder.items.forEach(async (item) => {
        let product = await Product.findById(item.productID)
        product.users.push(userOfCart._id)
        product.stockQuantity -= item.quantity
        await product.save()

        let seller = await Seller.findById(product.seller)
        seller.productsSold.push({ productID: product._id, orderID: newOrder._id })
        await seller.save({ validateBeforeSave: false })
    })

    const userOptions = {
        email: userOfCart.email,
        subject: `Your Urban Bazzar order #${newOrder._id} of ${newOrder.items.length} item`,
        message: `<h1 style="margin: 0;">Order Confirmation</h1><br>
    <p style="font-size: 24px; color: #cc662f; margin: 0;">Hello ${userOfCart.name},</p>
    <p style="margin: 0;" style="margin: 0;">Thank you for shopping with us. We'd like to let you know that seller has received your order, and is preparing it for shipment.</p>
  <p style="margin: 0;"><span style="font-size:18px; font-style:bold">Your order will be sent to:</span> <br> ${userOfCart.address.line}, <br> ${userOfCart.address.city}, <br> ${userOfCart.address.state}, <br> ${userOfCart.address.country}, <br> ${userOfCart.address.pincode} </p>
  <p style="margin: 0;" style="margin: 0;">Order summary</p>
    <p style="margin: 0;">Item subtotal: $ ${newOrder.totalPrice}</p>
  <p style="margin: 0;">Shipping & Handling: $ $ 0.00</p>
  <p style="margin: 0;">Order Total: $ ${newOrder.totalPrice}</p>
        `
    }

    try {
        await sendEmail(userOptions)
        res.status(201).redirect("/payment-success")
    } catch (error) {
        throw new customError("Unable to send payment confirmation on user email")
    }

})

export { addAddress, payment }