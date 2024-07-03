import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Product from "../models/product_models.js";
import customError from "../utils/customError.js";
import Seller from "../models/seller_models.js";
import User from "../models/user_models.js";
import Cart from "../models/cart_models.js";

const addProduct = asyncErrorHandler(async (req, res) => {
    const productImage = await uploadOnCloudinary(req.file.path)
    const { name, description, price, category, stockQuantity, sellerID } = req.body

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stockQuantity,
        seller: sellerID,
        productImage: productImage.url
    })

    if (!product) {
        throw new customError("Unable to add product in DB", 400)
    }
    const seller = await Seller.findByIdAndUpdate(sellerID, { $push: { productsListed: product._id } }, { new: true })
    res.status(201).redirect('/seller/listed-product')

})

const toggleProduct = asyncErrorHandler(async (req, res) => {
    const { productID, active } = req.body
    const product = await Product.findById(productID)
    if (active === 'true') {
        product.active = false
    }
    else {
        product.active = true
    }
    await product.save()

    res.status(200).redirect('back')
})

const deleteProduct = asyncErrorHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.body.productID)
    res.status(200).redirect('back');
})

const addToCart = asyncErrorHandler(async (req, res) => {

    let { userID, productID, quantity } = req.body

    const user = await User.findById(userID)
    const product = await Product.findById(productID)
    if (!user || !product) {
        throw new customError("Unable to find user or product for add to cart", 400)
    }

    quantity = quantity * 1
    const totalPrice = quantity * product.price

    let cart = await Cart.findOne({ userID })
    if (cart) {
        let existingItem = cart.items.find(item => {
            return item.productID.toString() === product._id.toString()
        })
        if (existingItem) {
            existingItem.quantity += quantity
            existingItem.totalPrice = existingItem.quantity * product.price
        }
        else {
            cart.items.push({
                productID: product._id,
                name: product.name,
                quantity,
                price: product.price,
                productImage: product.productImage,
                totalPrice
            })
        }

        await cart.save()
    }
    else {
        cart = await Cart.create({
            userID: user._id,
            items: [{
                productID: product._id,
                name: product.name,
                price: product.price,
                quantity,
                productImage: product.productImage,
                totalPrice
            }]
        })
    }

    // const updateUser = await User.findOneAndUpdate({ _id: user._id }, { $set: { cart: cart._id } }, { new: true })
    const updateUser = await User.findByIdAndUpdate(user._id, { cart: cart._id }, { new: true })


    res.status(200).json({
        status: "Success",
        cartItem: cart.totalQuantity
    })

})

const removeFromCart = asyncErrorHandler(async (req, res) => {
    const { cartItemToRemoveID, userCartID } = req.body

    const userCart = await Cart.findById(userCartID)

    if (!userCart) {
        throw new customError("User's Cart does not exist", 400)
    }

    const itemIndex = userCart.items.findIndex(item => item.productID.toString() === cartItemToRemoveID)
    if (itemIndex === -1) {
        throw new customError("Item doest not exist in Cart", 400)
    }

    userCart.items.splice(itemIndex, 1)

    userCart.save()

    res.status(200).redirect('back')

})


export { addProduct, deleteProduct, toggleProduct, addToCart, removeFromCart }