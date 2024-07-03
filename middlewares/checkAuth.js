import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";
import User from "../models/user_models.js";

const checkAuth = asyncErrorHandler(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        if (req.originalUrl === '/'
            || req.originalUrl === '/login'
            || req.originalUrl === '/signup'
            || req.originalUrl.startsWith('/seller')
            || req.originalUrl === '/browse-products') {
            return next()
        }
        else {
            throw new customError("You are not logged in", 401)
        }
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.clearCookie('token')
            throw new customError(err.message, 401)
        }
        return decodedToken
    })

    const user = await User.findById(decodedToken.id)
        .populate({ path: 'orderHistory', options: { sort: { 'createdAt': -1 } } })
        .populate("cart")

    if (!user) {
        res.clearCookie('token')
        throw new customError("Invalid token or user does not exist, Please login again", 401)
    }

    req.user = user
    next()
})

export default checkAuth