import Seller from "../models/seller_models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.Expire_Time
    })
}

const sendCookie = (sellerToken, res) => {
    res.clearCookie('token')
    res.clearCookie('sellerToken')

    const options = {
        maxAge: process.env.Expire_Time,
        httpOnly: true
    }

    if (process.env.ENVI === 'prod') {
        options.secure = true
    }

    res.cookie('sellerToken', sellerToken, options)
}

const sellerSignup = asyncErrorHandler(async (req, res) => {
    const { name, email, password, confirmPassword, ...address } = req.body
    const seller = await Seller.create({
        name, email, password, confirmPassword, address
    })
    if (!seller) {
        throw new customError('Unable to create seller account', 400)
    }

    const sellerToken = generateToken(seller._id)
    sendCookie(sellerToken, res)

    res.status(201).redirect('/seller')
})

const sellerLogin = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new customError("Please provide seller login credential for login", 400)
    }

    const seller = await Seller.findOne({ email }).select("+password")

    if (!seller || !(await seller.comparePasswordFromDB(password, seller.password))) {
        throw new customError("Invalid Seller login Credential", 401)
    }

    const sellerToken = generateToken(seller._id)
    sendCookie(sellerToken, res)

    res.status(200).redirect('/seller')
})

const sellerLogout = (req, res) => {
    res.clearCookie('sellerToken').redirect('/seller')
}

export { sellerSignup, sellerLogin, sellerLogout }