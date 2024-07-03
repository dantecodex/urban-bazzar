import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customError.js";
import Seller from "../models/seller_models.js";

const checkSellerAuth = asyncErrorHandler(async (req, res, next) => {
    const sellerToken = req.cookies.sellerToken

    if (!sellerToken) {
        if (req.originalUrl === '/seller' || req.originalUrl === '/seller/login' || req.originalUrl === '/seller/signup') {
            return next()
        }
        else {
            throw new customError("Login with your seller account", 401)
        }
    }

    const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.clearCookie('sellerToken')
            throw new customError(err.message, 401)
        }
        return decodedToken
    })

    const seller = await Seller.findById(decodedToken.id)
        .populate("productsListed")

    if (!seller) {
        res.clearCookie('sellerToken')
        throw new customError("Invalid token or Seller does not exist, Please login again", 401)
    }

    req.seller = seller
    next()

})

export default checkSellerAuth