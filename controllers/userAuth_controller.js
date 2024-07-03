import User from "../models/user_models.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import customError from "../utils/customError.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.Expire_Time
    })
}

const sendCookie = (token, res) => {
    res.clearCookie('token')

    const options = {
        maxAge: process.env.Expire_Time,
        httpOnly: true
    }

    if (process.env.ENVI === 'prod') {
        options.secure = true
    }

    res.cookie('token', token, options)
}

const userSignup = asyncErrorHandler(async (req, res) => {
    const user = await User.create(req.body)
    if (!user) {
        throw new customError('Failed to create user, Please try again', 400)
    }

    const token = generateToken(user._id)
    sendCookie(token, res)

    res.status(201).redirect('/')

})

const userLogin = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new customError("Please provide user credential to login", 401)
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.comparePasswordFromDB(password, user.password))) {
        throw new customError("Invalid user credentials entered", 401)
    }

    const token = generateToken(user._id)
    sendCookie(token, res)

    res.status(200).redirect('/')

})

const userLogout = (req, res) => {
    res.clearCookie('token').redirect('/')
}

export { userSignup, userLogin, userLogout }