import express from "express"
import { userSignup, userLogin, userLogout } from "../controllers/userAuth_controller.js"
import { addAddress } from "../controllers/user_controller.js"

const userAuthRouter = express.Router()
userAuthRouter.route('/signup').post(userSignup)
userAuthRouter.route('/login').post(userLogin)
userAuthRouter.route('/logout').get(userLogout)


export default userAuthRouter