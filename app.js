import express from "express"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet"

import cookieParser from "cookie-parser"
import userAuthRouter from "./router/userAuth_route.js"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"
import staticRouter from "./router/static_route.js"
import checkAuth from "./middlewares/checkAuth.js"
import sellerAuthRouter from "./router/sellerAuth_route.js"
import checkSellerAuth from "./middlewares/checkSellerAuth.js"
import sellerStaticRouter from "./router/sellerStatic_route.js"
import productRouter from "./router/product_route.js"
import userRouter from "./router/user.route.js"


const app = express()
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"],
                "img-src": ["'self'", "data:", "http://res.cloudinary.com"],
            },
        },
    }),
);
const limiter = rateLimit({
    limit: 1000,
    windowMs: 60 * 60 * 1000
})
app.use(limiter)
app.use(mongoSanitize())

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")


// API Routes
app.use('/api/v1/userAuth', userAuthRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/sellerAuth', sellerAuthRouter)
app.use('/api/v1/product', productRouter)

// Static Route
app.use('/', checkAuth, staticRouter)
app.use('/seller', checkSellerAuth, sellerStaticRouter)
app.use('*', (req, res) => {
    res.render("page404")
})

// Global Error handler
app.use(globalErrorHandler)
export default app